import { combineRgb, type CompanionPresetDefinitions, type CompanionOptionValues } from '@companion-module/base'
import type { ModuleInstance } from './main.js'

const WHITE = combineRgb(255, 255, 255)
const BLACK = combineRgb(0, 0, 0)
const GREEN = combineRgb(0, 200, 0)
const RED = combineRgb(200, 0, 0)
const ORANGE = combineRgb(220, 120, 0)
const BLUE = combineRgb(0, 100, 220)
const DARK_GREY = combineRgb(40, 40, 40)

function btn(
	category: string,
	name: string,
	text: string,
	actionId: string,
	options: CompanionOptionValues = {},
	bgcolor = DARK_GREY,
	color = WHITE,
): CompanionPresetDefinitions[string] {
	return {
		type: 'button',
		category,
		name,
		style: {
			text,
			size: 'auto',
			color,
			bgcolor,
			show_topbar: false,
		},
		steps: [
			{
				down: [{ actionId, options }],
				up: [],
			},
		],
		feedbacks: [],
	}
}

export function UpdatePresets(self: ModuleInstance): void {
	const presets: CompanionPresetDefinitions = {
		// Transport
		play: btn('Transport', 'Play', 'PLAY', 'transport_play', {}, GREEN, BLACK),
		stop: btn('Transport', 'Stop', 'STOP', 'transport_stop', {}, RED, WHITE),
		toggle_roll: btn('Transport', 'Play / Stop', 'PLAY\nSTOP', 'toggle_roll'),
		rewind: btn('Transport', 'Rewind', '<<', 'rewind'),
		ffwd: btn('Transport', 'Fast Forward', '>>', 'ffwd'),
		goto_start: btn('Transport', 'Go to Start', '|<', 'goto_start'),
		goto_end: btn('Transport', 'Go to End', '>|', 'goto_end'),
		loop_toggle: btn('Transport', 'Loop Toggle', 'LOOP', 'loop_toggle', {}, BLUE),

		// Editor
		undo: btn('Editor', 'Undo', 'UNDO', 'undo'),
		redo: btn('Editor', 'Redo', 'REDO', 'redo'),
		save: btn('Editor', 'Save', 'SAVE', 'save_state'),
		toggle_click: btn('Editor', 'Click / Metronome', 'CLICK', 'toggle_click'),
		prev_marker: btn('Editor', 'Previous Marker', '<MRK', 'prev_marker'),
		next_marker: btn('Editor', 'Next Marker', 'MRK>', 'next_marker'),
		add_marker: btn('Editor', 'Add Marker', '+MRK', 'add_marker', { name: '' }),
		toggle_punch_in: btn('Editor', 'Toggle Punch In', 'PUNCH\nIN', 'toggle_punch_in', {}, ORANGE),
		toggle_punch_out: btn('Editor', 'Toggle Punch Out', 'PUNCH\nOUT', 'toggle_punch_out', {}, ORANGE),
		cancel_all_solos: btn('Editor', 'Cancel All Solos', 'UNSOLO\nALL', 'cancel_all_solos', {}, ORANGE),
		midi_panic: btn('Editor', 'MIDI Panic', 'MIDI\nPANIC', 'midi_panic', {}, RED),
		toggle_monitor_dim: btn('Editor', 'Monitor Dim', 'DIM', 'toggle_monitor_dim'),
		toggle_monitor_mono: btn('Editor', 'Monitor Mono', 'MONO', 'toggle_monitor_mono'),
		toggle_monitor_mute: btn('Editor', 'Monitor Mute', 'MON\nMUTE', 'toggle_monitor_mute', {}, RED),

		// Zoom
		zoom_to_session: btn('Zoom', 'Zoom to Session', 'ZOOM\nALL', 'zoom_to_session'),
		zoom_in: btn('Zoom', 'Zoom In', 'Z IN', 'temporal_zoom_in'),
		zoom_out: btn('Zoom', 'Zoom Out', 'Z OUT', 'temporal_zoom_out'),
		zoom_100ms: btn('Zoom', '100ms', '100ms', 'zoom_100_ms'),
		zoom_1sec: btn('Zoom', '1 Second', '1s', 'zoom_1_sec'),
		zoom_10sec: btn('Zoom', '10 Seconds', '10s', 'zoom_10_sec'),
		zoom_1min: btn('Zoom', '1 Minute', '1m', 'zoom_1_min'),

		// Scroll / Banking
		scroll_up: btn('Scroll', 'Scroll Up 1 Track', 'SCR UP', 'scroll_up_1_track'),
		scroll_dn: btn('Scroll', 'Scroll Down 1 Track', 'SCR DN', 'scroll_dn_1_track'),
		bank_up: btn('Scroll', 'Bank Up', 'BANK UP', 'bank_up'),
		bank_dn: btn('Scroll', 'Bank Down', 'BANK DN', 'bank_down'),

		// Master
		master_mute_on: btn('Master', 'Master Mute On', 'MSTR\nMUTE', 'master_mute', { mute: 1 }, RED),
		master_mute_off: btn('Master', 'Master Mute Off', 'MSTR\nMUTE\nOFF', 'master_mute', { mute: 0 }),

		// Misc
		refresh: btn('Misc', 'Refresh State', 'REFRESH', 'refresh'),
	}

	self.setPresetDefinitions(presets)
}
