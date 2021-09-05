# Discord server bot

## Create the minecraft server

### Overview

We want to create a new ubuntu server using EC2 and install java to run minecraft. Make sure to start a ubuntu server and install the the jre and jdk. Due to the new changes with minecraft, we will also need the latest jdk, otherwise, it will fail to start the server. We need to use screen or else the server will close when we close the terminal. If you want this behaviour then skip the screen command.

1. Create EC2 instance on AWS

   - Configure the settings, make sure it is ubuntu

2. SSH into the instance using the `ssh -i ~/.ssh/sshFile.pem username@ipAddress`

3. Install the required packages

   - Update all packages with apt
   - Download the following with apt
     - jre (java runtime environment)
     - jdk (java developer kit)
     - jdk.16 (java developer kit v16 - needed for latest minecraft version)

4. Download the minecraft server from minecraft website (https://www.minecraft.net/en-us/download/server)

   - `wget https://link_to_link`

5. Run the server

   - `java -Xmx1024M -Xms1024M -jar server_file.jar nogui`
   - This should fail the first time as we have not accepted the EULA (terms and condition)
   - There should now be a `eula.txt` after running the above command.
   - Vim into the file and change to `eula=true`

6. The server should now be running. Connect to the server using the ip address in minecraft.

7. Once you have confirmed it is all working, go back to the terminal and stop the server. We want to use screen so that when we close the terminal, the server continues.
   - Type `screen` and press `enter`
   - Now run the server again
   - Now detach the screen with `ctrl + a + d`
   - Now feel free to close the terminal and the ssh session

## Transferring world files

### Overview

We want to ssh into the old server, and copy the files onto your local computer. Then repeat the steps and ssh into the new server and upload the files from the local computer to the new server.

1. Open terminal and ssh into the old server.

   - `ssh -i ~/.ssh/ssh_file.pem username@ip`

2. With the ssh connection established, now open a new tab and begin copying the files.

   - `scp -r username@ip:/path/to/server/world ~/minecraft`

3. Now go to the original ssh and close it as we no longer need it.

4. Now establish a new ssh connection with the new server and repeat.
   - `scp -r ~/minecraft/world username@ip:/path/to/server`

## Automate the server

### Run the server when the EC2 instance starts

We can make the EC2 instance automatically run the minecraft server when it is started by putting it in the system services.

We do this by creating a file called `minecraft.service` in the directory `/etc/systemd/system/`. Then write in the `minecraft.service` file:

```
[Unit]
Description=Minecraft Server
After=network.target

[Service]
User=ubuntu
Nice=5
KillMode=none
SuccessExitStatus=0 1
InaccessibleDirectories=/root /sys /srv /media -/lost+found
NoNewPrivileges=true
WorkingDirectory=/path/to/minecraft/server
ReadWriteDirectories=/path/to/minecraft/server
ExecStart=/usr/bin/java -Xmx1024M -Xms1024M -jar /path/to/minecraft/server.jar nogui
ExecStop=/path/to/minecraft/tools/mcrcon/mcrcon -H 127.0.0.1 -P 25575 -p strong-password stop

[Install]
WantedBy=multi-user.target
```

Now we want to make sure the file is executable: `sudo chmod 664 /etc/systemd/system/minecraft.service`

When we add/edit a service a file, we want will need to update it in the system: `sudo systemctl daemon-reload`

We can now test that the service is working by running the command: `sudo systemctl start minecraft`

Once we confirmed it is working, we will need to enable the service so it can run when the server starts: `sudo systemctl enable minecraft`

Now we can stop the instance and start it again. See that you can connect to the server in minecraft without ssh into the server and starting it manually.
