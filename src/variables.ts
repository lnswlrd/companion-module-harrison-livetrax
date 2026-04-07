import type { ModuleInstance } from './main.js'

export function UpdateVariableDefinitions(self: ModuleInstance): void {
	self.setVariableDefinitions([
		// Position
		{ variableId: 'position_smpte', name: 'Playhead Position (SMPTE)' },
		{ variableId: 'position_bbt', name: 'Playhead Position (Bar|Beat|Tick)' },
		{ variableId: 'position_time', name: 'Playhead Position (Min:Sec)' },
		{ variableId: 'position_samples', name: 'Playhead Position (Samples)' },
		// Transport
		{ variableId: 'transport_play', name: 'Transport Playing (0/1)' },
		{ variableId: 'transport_stop', name: 'Transport Stopped (0/1)' },
		{ variableId: 'record_tally', name: 'Record Tally (0/1)' },
		{ variableId: 'loop', name: 'Loop Active (0/1)' },
		{ variableId: 'punch_in', name: 'Punch In Active (0/1)' },
		{ variableId: 'punch_out', name: 'Punch Out Active (0/1)' },
		{ variableId: 'click', name: 'Click/Metronome Active (0/1)' },
		// Session
		{ variableId: 'session_name', name: 'Session Name' },
		{ variableId: 'marker', name: 'Current Marker' },
		// Selected strip
		{ variableId: 'select_name', name: 'Selected Strip Name' },
		{ variableId: 'select_gain', name: 'Selected Strip Gain (dB)' },
		{ variableId: 'select_fader', name: 'Selected Strip Fader' },
		{ variableId: 'select_meter', name: 'Selected Strip Meter (dB)' },
		{ variableId: 'select_mute', name: 'Selected Strip Mute (0/1)' },
		{ variableId: 'select_solo', name: 'Selected Strip Solo (0/1)' },
		{ variableId: 'select_recenable', name: 'Selected Strip Rec Enable (0/1)' },
		// Master
		{ variableId: 'master_gain', name: 'Master Gain (dB)' },
		{ variableId: 'master_meter', name: 'Master Meter (dB)' },
		// Jog
		{ variableId: 'jog_mode', name: 'Jog Mode Name' },
	])
}
