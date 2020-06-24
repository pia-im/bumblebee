# Pia voice assistant

See the [Pia documentation](https://docs.pia.im).

# Install

1. `yarn install`
2. `sudo apt install mpg123` or `mpd` (see start.js `import AudioVideoPlayer`)
3. [Pia install](https://docs.pia.im/setup/install)
   1. Download the [Pia app data files](https://pia.im/download/pia-data.tar.bz2) and extract them in `./data/`
   2. `cp config-min.json config.json` and adapt `config.json`
4. `ln -s node_modules/pia/app/ app`

# Run

`yarn start`

# TODO

* Find files in `node_modules/pia/` instead of in current directory. Would remove install step 4. Would also remove `config-*.json` from this repo.
