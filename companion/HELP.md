# Harrison Audio LiveTrax

LiveTrax remote control through Open Sound Control (OSC)

Harrison support pages [External Control](https://rsrc.harrisonconsoles.com/livetrax/livetrax-live-manual/3/en/topic/external-control) explains how to enable OSC remote and also the list of protocol commands upon which this plugin was built. 

But in short, open LiveTrax. Go to **Preferences > Control Surfaces > enable OSC**. 
By default, LiveTrax is set to receive OSC UDP at port 3819 and feedback returned at port 8000. 
Enable the module in Companion and set the IP to the computer running LiveTrax. 

## Available actions

- **Transport:** Play, stop, record, rewind, fast-forward, scrub, jog, loop, markers
- **Editor:** Undo/redo, punch in/out, snap, click track, snapshots, ranges
- **View:** Track fit, zoom levels, scroll, banking
- **Master strip:** Gain, fader, mute, pan, trim
- **Monitor strip:** Gain, fader, mute, dim, mono
- **Selected strip:** Full control of the currently selected track (gain, fader, pan, EQ, compressor, sends, plugins)
- **Per-track strip:** Control any specific track by number (gain, fader, mute, solo, rec, sends, plugins)
- **Misc:** Refresh state, list strips

## Feedback and variables

For Companion feedbacks and variables to work, feedback must be enabled in LiveTrax. 
Go to **Preferences > Control Surfaces > OSC > Default Feedback** and check the desired types.

This module supports all feedback message types in that list — Strip Buttons, Strip Controls, Heart Beat, Master Section, all Playhead Position formats, Metering, Signal Present, Trigger Grid, and Mixer Scene — except **Playhead Position as per GUI Clock**, which LiveTrax would not let me enable.

Feedbacks are available for transport state (playing, stopped, recording, loop, punch in/out, click) and selected strip (mute, solo, record enabled). Variables expose playhead position, session name, current marker, selected strip values, master gain/meter, and jog mode.

## Notes

- Strip numbers are 1-based (strip 1 = first track).
- Fader values are 0.0–2.0 (1.0 = 0 dB).
- Gain values are in dB.
- Pan position is −1.0 (full left) to 1.0 (full right).
