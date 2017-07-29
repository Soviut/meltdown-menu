# Meltdown Menu

Digital menu for advertising specials.

## Installation

- Install Docker 17+
- Clone this repository

## Development

### Start Development Server

- `cd meltdown-menu`
- `docker-compose up`
- Browse to http://localhost:4000

Local file changes will automatically be synced into the Docker container.
Refresh the browser to preview the changes.

Press `Ctrl + C` to stop the container.

### Commit Your Changes

    git commit -am "<short explanation of what changed>"

## Deployment

    git push -u origin master

## Displaying

The menu is intended to be run on a 16:9 aspect ratio display in either 
landscape or portrait modes. It can be served from a laptop or Raspberry Pi.

- Connect a PC or Raspberry Pi to the display via HDMI
- Open the latest Chrome or Firefox browser
- Browse to https://soviut.github.io/meltdown-menu/
- Put the browser in fullscreen mode (press `F11`)
- Refresh the page any time the specials are updated
- Disable the screen saver
- Disable sleep mode

## Raspberry Pi Configuration

If you're using a Raspberry Pi, the following configuration will boot 
directly into Chromium, orient the screen vertically (portrait) and 
disable the screen saver.

### Default Page in Chromium

- Open XWindows `startx`
- Open **Internet > Chromium**
- Browse to [chrome://settings/](chrome://settings/)
- Find the **On Startup** section
- Choose **Open a specific page or set of pages**
- Click **Add a New Page**
- In the **Site URL** field, enter `https://soviut.github.io/meltdown-menu`
- Click **Add**
- Click **OK**
- Close the Settings tab
- Close Chromium and reopen it to make sure the default page comes up

### Rotate Display

- `sudo nano /boot/config.txt`
- Add the following at the end `display_rotate=3` to rotate 270 degrees (portrait)
  - `display_rotate=0` landscape
  - `display_rotate=1` 90 degrees, portrait (top is right)
  - `display_rotate=2` 180 degrees, inverted landscape
  - `display_rotate=3` 270 degrees, portrait (top is left)
- `Ctrl + W` to save
- `Ctrl + X` to exit Nano
- Restart `sudo reboot`

### Boot to XWindows

- `raspi-config` (use arrow keys and Enter to navigate)
- Choose **boot_behaviour**
- Choose **Start desktop on boot**
- Choose **Finish** to exit
- Reboot to ensure it boots directly into XWindows

### Chromium Kiosk Mode

Starting Chromium in kiosk mode locks the browser down more 
and won't show as many on screen prompts.

- `nano ~/.config/autostart/chromium.desktop`
- Add the following
```
[Desktop Entry] 
Type=Application
Exec=chromium --kiosk https://soviut.github.io/meltdown-menu
```
- `Ctrl + W` to save
- `Ctrl + X` to exit Nano
- Restart `sudo reboot`

### Disable Local Login Prompt

No human intervention should be needed after rebooting so 
the local login prompt can be disabled. Remote SSH access will 
still be allowed with a key.

These following are based on [these instructions](http://raspi.tv/2012/how-to-set-up-keys-and-disable-password-login-for-ssh-on-your-raspberry-pi)

**TODO**