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
