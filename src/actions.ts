import type { CompanionActionDefinitions } from '@companion-module/base'
import type { ModuleInstance } from './main.js'

const ON_OFF_CHOICES = [
	{ id: 1, label: '1 (On)' },
	{ id: 0, label: '0 (Off)' },
]

export function UpdateActions(self: ModuleInstance): void {
	const actions: CompanionActionDefinitions = {
		// ─── TRANSPORT ────────────────────────────────────────────────────────────

		transport_play: {
			name: 'Transport: Play',
			options: [],
			callback: () => self.osc.send('/transport_play'),
		},

		transport_stop: {
			name: 'Transport: Stop',
			options: [],
			callback: () => self.osc.send('/transport_stop'),
		},

		toggle_roll: {
			name: 'Transport: Toggle Roll (Play/Stop)',
			options: [],
			callback: () => self.osc.send('/toggle_roll'),
		},

		stop_forget: {
			name: 'Transport: Stop and Forget Capture',
			options: [],
			callback: () => self.osc.send('/stop_forget'),
		},

		rewind: {
			name: 'Transport: Rewind',
			options: [],
			callback: () => self.osc.send('/rewind'),
		},

		ffwd: {
			name: 'Transport: Fast Forward',
			options: [],
			callback: () => self.osc.send('/ffwd'),
		},

		goto_start: {
			name: 'Transport: Go to Start',
			options: [],
			callback: () => self.osc.send('/goto_start'),
		},

		goto_end: {
			name: 'Transport: Go to End',
			options: [],
			callback: () => self.osc.send('/goto_end'),
		},

		loop_toggle: {
			name: 'Transport: Loop Toggle',
			options: [],
			callback: () => self.osc.send('/loop_toggle'),
		},

		loop_location: {
			name: 'Transport: Set Loop Location',
			options: [
				{
					type: 'number',
					id: 'start',
					label: 'Loop Start (bar)',
					default: 1,
					min: 1,
					max: 9999,
				},
				{
					type: 'number',
					id: 'end',
					label: 'Loop End (bar)',
					default: 2,
					min: 1,
					max: 9999,
				},
			],
			callback: (action) =>
				self.osc.send('/loop_location', [
					{ type: 'i', value: Number(action.options.start) },
					{ type: 'i', value: Number(action.options.end) },
				]),
		},

		scrub: {
			name: 'Transport: Scrub',
			options: [
				{
					type: 'number',
					id: 'speed',
					label: 'Speed',
					default: 1,
					min: -32,
					max: 32,
				},
			],
			callback: (action) => self.osc.send('/scrub', [{ type: 'f', value: Number(action.options.speed) }]),
		},

		jog: {
			name: 'Transport: Jog',
			options: [
				{
					type: 'number',
					id: 'delta',
					label: 'Delta',
					default: 1,
					min: -999,
					max: 999,
				},
			],
			callback: (action) => self.osc.send('/jog', [{ type: 'f', value: Number(action.options.delta) }]),
		},

		jog_mode: {
			name: 'Transport: Jog Mode',
			options: [
				{
					type: 'number',
					id: 'mode',
					label: 'Mode',
					default: 0,
					min: 0,
					max: 4,
				},
			],
			callback: (action) => self.osc.send('/jog/mode', [{ type: 'f', value: Number(action.options.mode) }]),
		},

		set_transport_speed: {
			name: 'Transport: Set Speed',
			options: [
				{
					type: 'number',
					id: 'speed',
					label: 'Speed (1.0 = normal)',
					default: 1,
					min: -8,
					max: 8,
				},
			],
			callback: (action) =>
				self.osc.send('/set_transport_speed', [{ type: 'f', value: Number(action.options.speed) }]),
		},

		transport_frame: {
			name: 'Transport: Query Current Frame',
			options: [],
			callback: () => self.osc.send('/transport_frame'),
		},

		transport_speed: {
			name: 'Transport: Query Current Speed',
			options: [],
			callback: () => self.osc.send('/transport_speed'),
		},

		record_enabled: {
			name: 'Transport: Query Record Enabled',
			options: [],
			callback: () => self.osc.send('/record_enabled'),
		},

		add_marker: {
			name: 'Transport: Add Marker',
			options: [
				{
					type: 'textinput',
					id: 'name',
					label: 'Marker Name (leave empty for current position)',
					default: '',
				},
			],
			callback: (action) => {
				const name = String(action.options.name ?? '').trim()
				if (name) {
					self.osc.send('/add_marker', [{ type: 's', value: name }])
				} else {
					self.osc.send('/add_marker')
				}
			},
		},

		marker: {
			name: 'Transport: Go to Marker',
			options: [
				{
					type: 'textinput',
					id: 'name',
					label: 'Marker Name or Number',
					default: '',
				},
			],
			callback: (action) => {
				const val = String(action.options.name ?? '').trim()
				const asInt = parseInt(val, 10)
				if (!isNaN(asInt) && String(asInt) === val) {
					self.osc.send('/marker', [{ type: 'i', value: asInt }])
				} else {
					self.osc.send('/marker', [{ type: 's', value: val }])
				}
			},
		},

		access_action: {
			name: 'Transport: Access Action',
			options: [
				{
					type: 'textinput',
					id: 'action_name',
					label: 'Action Name',
					default: '',
				},
			],
			callback: (action) =>
				self.osc.send('/access_action', [{ type: 's', value: String(action.options.action_name ?? '') }]),
		},

		// ─── EDITOR ───────────────────────────────────────────────────────────────

		locate: {
			name: 'Editor: Locate (Bar/Beat)',
			options: [
				{
					type: 'number',
					id: 'bar',
					label: 'Bar',
					default: 1,
					min: 1,
					max: 9999,
				},
				{
					type: 'number',
					id: 'beat',
					label: 'Beat',
					default: 1,
					min: 1,
					max: 16,
				},
			],
			callback: (action) =>
				self.osc.send('/locate', [
					{ type: 'i', value: Number(action.options.bar) },
					{ type: 'i', value: Number(action.options.beat) },
				]),
		},

		save_state: {
			name: 'Editor: Save',
			options: [],
			callback: () => self.osc.send('/save_state'),
		},

		undo: {
			name: 'Editor: Undo',
			options: [],
			callback: () => self.osc.send('/undo'),
		},

		redo: {
			name: 'Editor: Redo',
			options: [],
			callback: () => self.osc.send('/redo'),
		},

		prev_marker: {
			name: 'Editor: Previous Marker',
			options: [],
			callback: () => self.osc.send('/prev_marker'),
		},

		next_marker: {
			name: 'Editor: Next Marker',
			options: [],
			callback: () => self.osc.send('/next_marker'),
		},

		remove_marker: {
			name: 'Editor: Remove Marker',
			options: [],
			callback: () => self.osc.send('/remove_marker'),
		},

		mark_in: {
			name: 'Editor: Mark In',
			options: [],
			callback: () => self.osc.send('/mark_in'),
		},

		mark_out: {
			name: 'Editor: Mark Out',
			options: [],
			callback: () => self.osc.send('/mark_out'),
		},

		toggle_punch_in: {
			name: 'Editor: Toggle Punch In',
			options: [],
			callback: () => self.osc.send('/toggle_punch_in'),
		},

		toggle_punch_out: {
			name: 'Editor: Toggle Punch Out',
			options: [],
			callback: () => self.osc.send('/toggle_punch_out'),
		},

		set_punch_range: {
			name: 'Editor: Set Punch Range',
			options: [],
			callback: () => self.osc.send('/set_punch_range'),
		},

		set_loop_range: {
			name: 'Editor: Set Loop Range',
			options: [],
			callback: () => self.osc.send('/set_loop_range'),
		},

		set_session_range: {
			name: 'Editor: Set Session Range',
			options: [],
			callback: () => self.osc.send('/set_session_range'),
		},

		rec_enable_toggle: {
			name: 'Editor: Toggle Record Enable (Selected)',
			options: [],
			callback: () => self.osc.send('/rec_enable_toggle'),
		},

		toggle_all_rec_enables: {
			name: 'Editor: Toggle All Record Enables',
			options: [],
			callback: () => self.osc.send('/toggle_all_rec_enables'),
		},

		all_tracks_rec_in: {
			name: 'Editor: All Tracks Record In',
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 1,
				},
			],
			callback: (action) =>
				self.osc.send('/all_tracks_rec_in', [{ type: 'f', value: Number(action.options.value) }]),
		},

		all_tracks_rec_out: {
			name: 'Editor: All Tracks Record Out',
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 1,
					min: 0,
					max: 1,
				},
			],
			callback: (action) =>
				self.osc.send('/all_tracks_rec_out', [{ type: 'f', value: Number(action.options.value) }]),
		},

		cancel_all_solos: {
			name: 'Editor: Cancel All Solos',
			options: [],
			callback: () => self.osc.send('/cancel_all_solos'),
		},

		jump_bars: {
			name: 'Editor: Jump Bars',
			options: [
				{
					type: 'number',
					id: 'bars',
					label: 'Bars (negative = backward)',
					default: 1,
					min: -999,
					max: 999,
				},
			],
			callback: (action) => self.osc.send('/jump_bars', [{ type: 'f', value: Number(action.options.bars) }]),
		},

		jump_seconds: {
			name: 'Editor: Jump Seconds',
			options: [
				{
					type: 'number',
					id: 'seconds',
					label: 'Seconds (negative = backward)',
					default: 1,
					min: -3600,
					max: 3600,
				},
			],
			callback: (action) =>
				self.osc.send('/jump_seconds', [{ type: 'f', value: Number(action.options.seconds) }]),
		},

		toggle_click: {
			name: 'Editor: Toggle Click (Metronome)',
			options: [],
			callback: () => self.osc.send('/toggle_click'),
		},

		midi_panic: {
			name: 'Editor: MIDI Panic',
			options: [],
			callback: () => self.osc.send('/midi_panic'),
		},

		toggle_monitor_mute: {
			name: 'Editor: Toggle Monitor Mute',
			options: [],
			callback: () => self.osc.send('/toggle_monitor_mute'),
		},

		toggle_monitor_dim: {
			name: 'Editor: Toggle Monitor Dim',
			options: [],
			callback: () => self.osc.send('/toggle_monitor_dim'),
		},

		toggle_monitor_mono: {
			name: 'Editor: Toggle Monitor Mono',
			options: [],
			callback: () => self.osc.send('/toggle_monitor_mono'),
		},

		quick_snapshot_switch: {
			name: 'Editor: Quick Snapshot Switch',
			options: [],
			callback: () => self.osc.send('/quick_snapshot_switch'),
		},

		quick_snapshot_stay: {
			name: 'Editor: Quick Snapshot Stay',
			options: [],
			callback: () => self.osc.send('/quick_snapshot_stay'),
		},

		// ─── TRACK FIT ────────────────────────────────────────────────────────────

		fit_1_track: {
			name: 'View: Fit 1 Track',
			options: [],
			callback: () => self.osc.send('/fit_1_track'),
		},

		fit_2_tracks: {
			name: 'View: Fit 2 Tracks',
			options: [],
			callback: () => self.osc.send('/fit_2_tracks'),
		},

		fit_4_tracks: {
			name: 'View: Fit 4 Tracks',
			options: [],
			callback: () => self.osc.send('/fit_4_tracks'),
		},

		fit_8_tracks: {
			name: 'View: Fit 8 Tracks',
			options: [],
			callback: () => self.osc.send('/fit_8_tracks'),
		},

		fit_16_tracks: {
			name: 'View: Fit 16 Tracks',
			options: [],
			callback: () => self.osc.send('/fit_16_tracks'),
		},

		fit_32_tracks: {
			name: 'View: Fit 32 Tracks',
			options: [],
			callback: () => self.osc.send('/fit_32_tracks'),
		},

		fit_all_tracks: {
			name: 'View: Fit All Tracks',
			options: [],
			callback: () => self.osc.send('/fit_all_tracks'),
		},

		// ─── ZOOM ─────────────────────────────────────────────────────────────────

		zoom_100_ms: {
			name: 'Zoom: 100ms',
			options: [],
			callback: () => self.osc.send('/zoom_100_ms'),
		},

		zoom_1_sec: {
			name: 'Zoom: 1 Second',
			options: [],
			callback: () => self.osc.send('/zoom_1_sec'),
		},

		zoom_10_sec: {
			name: 'Zoom: 10 Seconds',
			options: [],
			callback: () => self.osc.send('/zoom_10_sec'),
		},

		zoom_1_min: {
			name: 'Zoom: 1 Minute',
			options: [],
			callback: () => self.osc.send('/zoom_1_min'),
		},

		zoom_5_min: {
			name: 'Zoom: 5 Minutes',
			options: [],
			callback: () => self.osc.send('/zoom_5_min'),
		},

		zoom_10_min: {
			name: 'Zoom: 10 Minutes',
			options: [],
			callback: () => self.osc.send('/zoom_10_min'),
		},

		zoom_to_session: {
			name: 'Zoom: Zoom to Session',
			options: [],
			callback: () => self.osc.send('/zoom_to_session'),
		},

		temporal_zoom_in: {
			name: 'Zoom: Zoom In',
			options: [],
			callback: () => self.osc.send('/temporal_zoom_in'),
		},

		temporal_zoom_out: {
			name: 'Zoom: Zoom Out',
			options: [],
			callback: () => self.osc.send('/temporal_zoom_out'),
		},

		// ─── SCROLL ───────────────────────────────────────────────────────────────

		scroll_up_1_track: {
			name: 'Scroll: Up 1 Track',
			options: [],
			callback: () => self.osc.send('/scroll_up_1_track'),
		},

		scroll_dn_1_track: {
			name: 'Scroll: Down 1 Track',
			options: [],
			callback: () => self.osc.send('/scroll_dn_1_track'),
		},

		scroll_up_1_page: {
			name: 'Scroll: Up 1 Page',
			options: [],
			callback: () => self.osc.send('/scroll_up_1_page'),
		},

		scroll_dn_1_page: {
			name: 'Scroll: Down 1 Page',
			options: [],
			callback: () => self.osc.send('/scroll_dn_1_page'),
		},

		// ─── BANKING ──────────────────────────────────────────────────────────────

		bank_up: {
			name: 'Banking: Bank Up',
			options: [],
			callback: () => self.osc.send('/bank_up'),
		},

		bank_down: {
			name: 'Banking: Bank Down',
			options: [],
			callback: () => self.osc.send('/bank_down'),
		},

		use_group: {
			name: 'Banking: Use Group',
			options: [
				{
					type: 'number',
					id: 'group',
					label: 'Group Number',
					default: 1,
					min: 1,
					max: 32,
				},
			],
			callback: (action) => self.osc.send('/use_group', [{ type: 'f', value: Number(action.options.group) }]),
		},

		// ─── MASTER STRIP ─────────────────────────────────────────────────────────

		master_gain: {
			name: 'Master: Set Gain (dB)',
			options: [
				{
					type: 'number',
					id: 'gain',
					label: 'Gain (dB)',
					default: 0,
					min: -193,
					max: 6,
				},
			],
			callback: (action) => self.osc.send('/master/gain', [{ type: 'f', value: Number(action.options.gain) }]),
		},

		master_fader: {
			name: 'Master: Set Fader',
			options: [
				{
					type: 'number',
					id: 'fader',
					label: 'Fader Position (0.0–2.0, 1.0 = 0 dB)',
					default: 1,
					min: 0,
					max: 2,
				},
			],
			callback: (action) =>
				self.osc.send('/master/fader', [{ type: 'f', value: Number(action.options.fader) }]),
		},

		master_db_delta: {
			name: 'Master: Fader Delta (dB)',
			options: [
				{
					type: 'number',
					id: 'delta',
					label: 'Delta (dB)',
					default: 1,
					min: -20,
					max: 20,
				},
			],
			callback: (action) =>
				self.osc.send('/master/db_delta', [{ type: 'f', value: Number(action.options.delta) }]),
		},

		master_mute: {
			name: 'Master: Mute',
			options: [
				{
					type: 'dropdown',
					id: 'mute',
					label: 'Mute',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) => self.osc.send('/master/mute', [{ type: 'i', value: Number(action.options.mute) }]),
		},

		master_trimdB: {
			name: 'Master: Set Trim (dB)',
			options: [
				{
					type: 'number',
					id: 'trim',
					label: 'Trim (dB)',
					default: 0,
					min: -20,
					max: 20,
				},
			],
			callback: (action) =>
				self.osc.send('/master/trimdB', [{ type: 'f', value: Number(action.options.trim) }]),
		},

		master_pan_stereo_position: {
			name: 'Master: Pan Stereo Position',
			options: [
				{
					type: 'number',
					id: 'pan',
					label: 'Pan (−1.0 = L, 0 = C, 1.0 = R)',
					default: 0,
					min: -1,
					max: 1,
				},
			],
			callback: (action) =>
				self.osc.send('/master/pan_stereo_position', [{ type: 'f', value: Number(action.options.pan) }]),
		},

		master_select: {
			name: 'Master: Select',
			options: [],
			callback: () => self.osc.send('/master/select', [{ type: 'f', value: 1 }]),
		},

		// ─── MONITOR STRIP ────────────────────────────────────────────────────────

		monitor_gain: {
			name: 'Monitor: Set Gain (dB)',
			options: [
				{
					type: 'number',
					id: 'gain',
					label: 'Gain (dB)',
					default: 0,
					min: -193,
					max: 6,
				},
			],
			callback: (action) =>
				self.osc.send('/monitor/gain', [{ type: 'f', value: Number(action.options.gain) }]),
		},

		monitor_fader: {
			name: 'Monitor: Set Fader',
			options: [
				{
					type: 'number',
					id: 'fader',
					label: 'Fader Position (0.0–2.0, 1.0 = 0 dB)',
					default: 1,
					min: 0,
					max: 2,
				},
			],
			callback: (action) =>
				self.osc.send('/monitor/fader', [{ type: 'f', value: Number(action.options.fader) }]),
		},

		monitor_db_delta: {
			name: 'Monitor: Fader Delta (dB)',
			options: [
				{
					type: 'number',
					id: 'delta',
					label: 'Delta (dB)',
					default: 1,
					min: -20,
					max: 20,
				},
			],
			callback: (action) =>
				self.osc.send('/monitor/db_delta', [{ type: 'f', value: Number(action.options.delta) }]),
		},

		monitor_mute: {
			name: 'Monitor: Mute',
			options: [
				{
					type: 'dropdown',
					id: 'mute',
					label: 'Mute',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/monitor/mute', [{ type: 'i', value: Number(action.options.mute) }]),
		},

		monitor_dim: {
			name: 'Monitor: Dim',
			options: [
				{
					type: 'dropdown',
					id: 'dim',
					label: 'Dim',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) => self.osc.send('/monitor/dim', [{ type: 'i', value: Number(action.options.dim) }]),
		},

		monitor_mono: {
			name: 'Monitor: Mono',
			options: [
				{
					type: 'dropdown',
					id: 'mono',
					label: 'Mono',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/monitor/mono', [{ type: 'i', value: Number(action.options.mono) }]),
		},

		// ─── SELECTED STRIP ───────────────────────────────────────────────────────

		select_recenable: {
			name: 'Selected: Record Enable',
			options: [
				{
					type: 'dropdown',
					id: 'value',
					label: 'State',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/select/recenable', [{ type: 'i', value: Number(action.options.value) }]),
		},

		select_record_safe: {
			name: 'Selected: Record Safe',
			options: [
				{
					type: 'dropdown',
					id: 'value',
					label: 'State',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/select/record_safe', [{ type: 'i', value: Number(action.options.value) }]),
		},

		select_mute: {
			name: 'Selected: Mute',
			options: [
				{
					type: 'dropdown',
					id: 'value',
					label: 'Mute',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/select/mute', [{ type: 'i', value: Number(action.options.value) }]),
		},

		select_solo: {
			name: 'Selected: Solo',
			options: [
				{
					type: 'dropdown',
					id: 'value',
					label: 'Solo',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/select/solo', [{ type: 'i', value: Number(action.options.value) }]),
		},

		select_solo_iso: {
			name: 'Selected: Solo Isolate',
			options: [
				{
					type: 'dropdown',
					id: 'value',
					label: 'State',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/select/solo_iso', [{ type: 'i', value: Number(action.options.value) }]),
		},

		select_solo_safe: {
			name: 'Selected: Solo Safe',
			options: [
				{
					type: 'dropdown',
					id: 'value',
					label: 'State',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/select/solo_safe', [{ type: 'i', value: Number(action.options.value) }]),
		},

		select_monitor_input: {
			name: 'Selected: Monitor Input',
			options: [
				{
					type: 'dropdown',
					id: 'value',
					label: 'State',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/select/monitor_input', [{ type: 'i', value: Number(action.options.value) }]),
		},

		select_monitor_disk: {
			name: 'Selected: Monitor Disk',
			options: [
				{
					type: 'dropdown',
					id: 'value',
					label: 'State',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/select/monitor_disk', [{ type: 'i', value: Number(action.options.value) }]),
		},

		select_polarity: {
			name: 'Selected: Polarity',
			options: [
				{
					type: 'dropdown',
					id: 'value',
					label: 'Polarity',
					default: 0,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/select/polarity', [{ type: 'i', value: Number(action.options.value) }]),
		},

		select_gain: {
			name: 'Selected: Set Gain (dB)',
			options: [
				{
					type: 'number',
					id: 'gain',
					label: 'Gain (dB)',
					default: 0,
					min: -193,
					max: 6,
				},
			],
			callback: (action) =>
				self.osc.send('/select/gain', [{ type: 'f', value: Number(action.options.gain) }]),
		},

		select_fader: {
			name: 'Selected: Set Fader',
			options: [
				{
					type: 'number',
					id: 'fader',
					label: 'Fader Position (0.0–2.0, 1.0 = 0 dB)',
					default: 1,
					min: 0,
					max: 2,
				},
			],
			callback: (action) =>
				self.osc.send('/select/fader', [{ type: 'f', value: Number(action.options.fader) }]),
		},

		select_db_delta: {
			name: 'Selected: Fader Delta (dB)',
			options: [
				{
					type: 'number',
					id: 'delta',
					label: 'Delta (dB)',
					default: 1,
					min: -20,
					max: 20,
				},
			],
			callback: (action) =>
				self.osc.send('/select/db_delta', [{ type: 'f', value: Number(action.options.delta) }]),
		},

		select_trimdB: {
			name: 'Selected: Set Trim (dB)',
			options: [
				{
					type: 'number',
					id: 'trim',
					label: 'Trim (dB)',
					default: 0,
					min: -20,
					max: 20,
				},
			],
			callback: (action) =>
				self.osc.send('/select/trimdB', [{ type: 'f', value: Number(action.options.trim) }]),
		},

		select_pan_stereo_position: {
			name: 'Selected: Pan Stereo Position',
			options: [
				{
					type: 'number',
					id: 'pan',
					label: 'Pan (−1.0 = L, 0 = C, 1.0 = R)',
					default: 0,
					min: -1,
					max: 1,
				},
			],
			callback: (action) =>
				self.osc.send('/select/pan_stereo_position', [{ type: 'f', value: Number(action.options.pan) }]),
		},

		select_pan_stereo_width: {
			name: 'Selected: Pan Stereo Width',
			options: [
				{
					type: 'number',
					id: 'width',
					label: 'Width (0.0–1.0)',
					default: 1,
					min: 0,
					max: 1,
				},
			],
			callback: (action) =>
				self.osc.send('/select/pan_stereo_width', [{ type: 'f', value: Number(action.options.width) }]),
		},

		select_pan_elevation_position: {
			name: 'Selected: Pan Elevation Position',
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Elevation (−1.0–1.0)',
					default: 0,
					min: -1,
					max: 1,
				},
			],
			callback: (action) =>
				self.osc.send('/select/pan_elevation_position', [{ type: 'f', value: Number(action.options.value) }]),
		},

		select_pan_frontback_position: {
			name: 'Selected: Pan Front/Back Position',
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Position (−1.0–1.0)',
					default: 0,
					min: -1,
					max: 1,
				},
			],
			callback: (action) =>
				self.osc.send('/select/pan_frontback_position', [{ type: 'f', value: Number(action.options.value) }]),
		},

		select_pan_lfe_control: {
			name: 'Selected: Pan LFE Control',
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'LFE (0.0–1.0)',
					default: 0,
					min: 0,
					max: 1,
				},
			],
			callback: (action) =>
				self.osc.send('/select/pan_lfe_control', [{ type: 'f', value: Number(action.options.value) }]),
		},

		select_send_gain: {
			name: 'Selected: Set Send Gain (dB)',
			options: [
				{
					type: 'number',
					id: 'send',
					label: 'Send Number',
					default: 1,
					min: 1,
					max: 64,
				},
				{
					type: 'number',
					id: 'gain',
					label: 'Gain (dB)',
					default: 0,
					min: -193,
					max: 6,
				},
			],
			callback: (action) =>
				self.osc.send('/select/send_gain', [
					{ type: 'i', value: Number(action.options.send) },
					{ type: 'f', value: Number(action.options.gain) },
				]),
		},

		select_send_fader: {
			name: 'Selected: Set Send Fader',
			options: [
				{
					type: 'number',
					id: 'send',
					label: 'Send Number',
					default: 1,
					min: 1,
					max: 64,
				},
				{
					type: 'number',
					id: 'fader',
					label: 'Fader Position (0.0–2.0)',
					default: 1,
					min: 0,
					max: 2,
				},
			],
			callback: (action) =>
				self.osc.send('/select/send_fader', [
					{ type: 'i', value: Number(action.options.send) },
					{ type: 'f', value: Number(action.options.fader) },
				]),
		},

		select_send_enable: {
			name: 'Selected: Send Enable',
			options: [
				{
					type: 'number',
					id: 'send',
					label: 'Send Number',
					default: 1,
					min: 1,
					max: 64,
				},
				{
					type: 'dropdown',
					id: 'enable',
					label: 'Enable',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/select/send_enable', [
					{ type: 'i', value: Number(action.options.send) },
					{ type: 'f', value: Number(action.options.enable) },
				]),
		},

		select_master_send_enable: {
			name: 'Selected: Master Send Enable',
			options: [
				{
					type: 'dropdown',
					id: 'enable',
					label: 'Enable',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/select/master_send_enable', [{ type: 'i', value: Number(action.options.enable) }]),
		},

		select_send_page: {
			name: 'Selected: Send Page',
			options: [
				{
					type: 'number',
					id: 'page',
					label: 'Page',
					default: 1,
					min: 1,
					max: 16,
				},
			],
			callback: (action) =>
				self.osc.send('/select/send_page', [{ type: 'f', value: Number(action.options.page) }]),
		},

		select_plug_page: {
			name: 'Selected: Plugin Page',
			options: [
				{
					type: 'number',
					id: 'page',
					label: 'Page',
					default: 1,
					min: 1,
					max: 16,
				},
			],
			callback: (action) =>
				self.osc.send('/select/plug_page', [{ type: 'f', value: Number(action.options.page) }]),
		},

		select_plugin: {
			name: 'Selected: Select Plugin',
			options: [
				{
					type: 'number',
					id: 'plugin',
					label: 'Plugin Number',
					default: 1,
					min: 1,
					max: 64,
				},
			],
			callback: (action) =>
				self.osc.send('/select/plugin', [{ type: 'f', value: Number(action.options.plugin) }]),
		},

		select_expand: {
			name: 'Selected: Expand',
			options: [
				{
					type: 'dropdown',
					id: 'value',
					label: 'Expand',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/select/expand', [{ type: 'i', value: Number(action.options.value) }]),
		},

		select_comp_enable: {
			name: 'Selected: Compressor Enable',
			options: [
				{
					type: 'dropdown',
					id: 'value',
					label: 'Enable',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/select/comp_enable', [{ type: 'f', value: Number(action.options.value) }]),
		},

		select_comp_threshold: {
			name: 'Selected: Compressor Threshold',
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Threshold (dB)',
					default: -20,
					min: -60,
					max: 0,
				},
			],
			callback: (action) =>
				self.osc.send('/select/comp_threshold', [{ type: 'f', value: Number(action.options.value) }]),
		},

		select_comp_speed: {
			name: 'Selected: Compressor Speed',
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Speed (0.0–1.0)',
					default: 0.5,
					min: 0,
					max: 1,
				},
			],
			callback: (action) =>
				self.osc.send('/select/comp_speed', [{ type: 'f', value: Number(action.options.value) }]),
		},

		select_comp_mode: {
			name: 'Selected: Compressor Mode',
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Mode',
					default: 0,
					min: 0,
					max: 4,
				},
			],
			callback: (action) =>
				self.osc.send('/select/comp_mode', [{ type: 'f', value: Number(action.options.value) }]),
		},

		select_comp_makeup: {
			name: 'Selected: Compressor Makeup Gain',
			options: [
				{
					type: 'number',
					id: 'value',
					label: 'Makeup Gain (dB)',
					default: 0,
					min: 0,
					max: 20,
				},
			],
			callback: (action) =>
				self.osc.send('/select/comp_makeup', [{ type: 'f', value: Number(action.options.value) }]),
		},

		select_eq_enable: {
			name: 'Selected: EQ Enable',
			options: [
				{
					type: 'dropdown',
					id: 'value',
					label: 'Enable',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/select/eq_enable', [{ type: 'f', value: Number(action.options.value) }]),
		},

		select_eq_hpf_freq: {
			name: 'Selected: EQ HPF Frequency',
			options: [
				{
					type: 'number',
					id: 'freq',
					label: 'Frequency (Hz)',
					default: 80,
					min: 10,
					max: 20000,
				},
			],
			callback: (action) =>
				self.osc.send('/select/eq_hpf/freq', [{ type: 'f', value: Number(action.options.freq) }]),
		},

		select_eq_hpf_enable: {
			name: 'Selected: EQ HPF Enable',
			options: [
				{
					type: 'dropdown',
					id: 'value',
					label: 'Enable',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/select/eq_hpf/enable', [{ type: 'f', value: Number(action.options.value) }]),
		},

		select_eq_hpf_slope: {
			name: 'Selected: EQ HPF Slope',
			options: [
				{
					type: 'number',
					id: 'slope',
					label: 'Slope',
					default: 12,
					min: 6,
					max: 48,
				},
			],
			callback: (action) =>
				self.osc.send('/select/eq_hpf/slope', [{ type: 'f', value: Number(action.options.slope) }]),
		},

		select_eq_lpf_freq: {
			name: 'Selected: EQ LPF Frequency',
			options: [
				{
					type: 'number',
					id: 'freq',
					label: 'Frequency (Hz)',
					default: 18000,
					min: 10,
					max: 20000,
				},
			],
			callback: (action) =>
				self.osc.send('/select/eq_lpf/freq', [{ type: 'f', value: Number(action.options.freq) }]),
		},

		select_eq_lpf_enable: {
			name: 'Selected: EQ LPF Enable',
			options: [
				{
					type: 'dropdown',
					id: 'value',
					label: 'Enable',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/select/eq_lpf/enable', [{ type: 'f', value: Number(action.options.value) }]),
		},

		select_eq_lpf_slope: {
			name: 'Selected: EQ LPF Slope',
			options: [
				{
					type: 'number',
					id: 'slope',
					label: 'Slope',
					default: 12,
					min: 6,
					max: 48,
				},
			],
			callback: (action) =>
				self.osc.send('/select/eq_lpf/slope', [{ type: 'f', value: Number(action.options.slope) }]),
		},

		select_eq_gain: {
			name: 'Selected: EQ Band Gain',
			options: [
				{
					type: 'number',
					id: 'band',
					label: 'Band Number',
					default: 1,
					min: 1,
					max: 8,
				},
				{
					type: 'number',
					id: 'gain',
					label: 'Gain (dB)',
					default: 0,
					min: -20,
					max: 20,
				},
			],
			callback: (action) =>
				self.osc.send('/select/eq_gain', [
					{ type: 'i', value: Number(action.options.band) },
					{ type: 'f', value: Number(action.options.gain) },
				]),
		},

		select_eq_freq: {
			name: 'Selected: EQ Band Frequency',
			options: [
				{
					type: 'number',
					id: 'band',
					label: 'Band Number',
					default: 1,
					min: 1,
					max: 8,
				},
				{
					type: 'number',
					id: 'freq',
					label: 'Frequency (Hz)',
					default: 1000,
					min: 10,
					max: 20000,
				},
			],
			callback: (action) =>
				self.osc.send('/select/eq_freq', [
					{ type: 'i', value: Number(action.options.band) },
					{ type: 'f', value: Number(action.options.freq) },
				]),
		},

		select_eq_q: {
			name: 'Selected: EQ Band Q',
			options: [
				{
					type: 'number',
					id: 'band',
					label: 'Band Number',
					default: 1,
					min: 1,
					max: 8,
				},
				{
					type: 'number',
					id: 'q',
					label: 'Q',
					default: 1,
					min: 0.1,
					max: 10,
				},
			],
			callback: (action) =>
				self.osc.send('/select/eq_q', [
					{ type: 'i', value: Number(action.options.band) },
					{ type: 'f', value: Number(action.options.q) },
				]),
		},

		select_eq_shape: {
			name: 'Selected: EQ Band Shape',
			options: [
				{
					type: 'number',
					id: 'band',
					label: 'Band Number',
					default: 1,
					min: 1,
					max: 8,
				},
				{
					type: 'number',
					id: 'shape',
					label: 'Shape',
					default: 0,
					min: 0,
					max: 4,
				},
			],
			callback: (action) =>
				self.osc.send('/select/eq_shape', [
					{ type: 'i', value: Number(action.options.band) },
					{ type: 'f', value: Number(action.options.shape) },
				]),
		},

		// ─── PER-TRACK STRIP ──────────────────────────────────────────────────────

		strip_mute: {
			name: 'Strip: Mute',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'dropdown',
					id: 'value',
					label: 'Mute',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/mute', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'i', value: Number(action.options.value) },
				]),
		},

		strip_solo: {
			name: 'Strip: Solo',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'dropdown',
					id: 'value',
					label: 'Solo',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/solo', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'i', value: Number(action.options.value) },
				]),
		},

		strip_solo_iso: {
			name: 'Strip: Solo Isolate',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'dropdown',
					id: 'value',
					label: 'State',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/solo_iso', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'i', value: Number(action.options.value) },
				]),
		},

		strip_solo_safe: {
			name: 'Strip: Solo Safe',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'dropdown',
					id: 'value',
					label: 'State',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/solo_safe', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'i', value: Number(action.options.value) },
				]),
		},

		strip_recenable: {
			name: 'Strip: Record Enable',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'dropdown',
					id: 'value',
					label: 'State',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/recenable', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'i', value: Number(action.options.value) },
				]),
		},

		strip_record_safe: {
			name: 'Strip: Record Safe',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'dropdown',
					id: 'value',
					label: 'State',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/record_safe', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'i', value: Number(action.options.value) },
				]),
		},

		strip_monitor_input: {
			name: 'Strip: Monitor Input',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'dropdown',
					id: 'value',
					label: 'State',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/monitor_input', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'i', value: Number(action.options.value) },
				]),
		},

		strip_monitor_disk: {
			name: 'Strip: Monitor Disk',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'dropdown',
					id: 'value',
					label: 'State',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/monitor_disk', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'i', value: Number(action.options.value) },
				]),
		},

		strip_expand: {
			name: 'Strip: Expand',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'dropdown',
					id: 'value',
					label: 'Expand',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/expand', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'i', value: Number(action.options.value) },
				]),
		},

		strip_select: {
			name: 'Strip: Select',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'dropdown',
					id: 'value',
					label: 'Select',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/select', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'i', value: Number(action.options.value) },
				]),
		},

		strip_polarity: {
			name: 'Strip: Polarity',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'dropdown',
					id: 'value',
					label: 'Polarity',
					default: 0,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/polarity', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'i', value: Number(action.options.value) },
				]),
		},

		strip_gain: {
			name: 'Strip: Set Gain (dB)',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'number',
					id: 'gain',
					label: 'Gain (dB)',
					default: 0,
					min: -193,
					max: 6,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/gain', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'f', value: Number(action.options.gain) },
				]),
		},

		strip_fader: {
			name: 'Strip: Set Fader',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'number',
					id: 'fader',
					label: 'Fader Position (0.0–2.0, 1.0 = 0 dB)',
					default: 1,
					min: 0,
					max: 2,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/fader', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'f', value: Number(action.options.fader) },
				]),
		},

		strip_trimdB: {
			name: 'Strip: Set Trim (dB)',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'number',
					id: 'trim',
					label: 'Trim (dB)',
					default: 0,
					min: -20,
					max: 20,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/trimdB', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'f', value: Number(action.options.trim) },
				]),
		},

		strip_pan_stereo_position: {
			name: 'Strip: Pan Stereo Position',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'number',
					id: 'pan',
					label: 'Pan (−1.0 = L, 0 = C, 1.0 = R)',
					default: 0,
					min: -1,
					max: 1,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/pan_stereo_position', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'f', value: Number(action.options.pan) },
				]),
		},

		strip_pan_stereo_width: {
			name: 'Strip: Pan Stereo Width',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'number',
					id: 'width',
					label: 'Width (0.0–1.0)',
					default: 1,
					min: 0,
					max: 1,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/pan_stereo_width', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'f', value: Number(action.options.width) },
				]),
		},

		strip_plugin_parameter: {
			name: 'Strip: Plugin Parameter',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'number',
					id: 'plugin',
					label: 'Plugin Number',
					default: 1,
					min: 1,
					max: 64,
				},
				{
					type: 'number',
					id: 'param',
					label: 'Parameter Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'number',
					id: 'value',
					label: 'Value',
					default: 0,
					min: 0,
					max: 1,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/plugin/parameter', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'i', value: Number(action.options.plugin) },
					{ type: 'i', value: Number(action.options.param) },
					{ type: 'f', value: Number(action.options.value) },
				]),
		},

		strip_plugin_parameter_print: {
			name: 'Strip: Print Plugin Parameter',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'number',
					id: 'plugin',
					label: 'Plugin Number',
					default: 1,
					min: 1,
					max: 64,
				},
				{
					type: 'number',
					id: 'param',
					label: 'Parameter Number',
					default: 1,
					min: 1,
					max: 256,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/plugin/parameter/print', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'i', value: Number(action.options.plugin) },
					{ type: 'i', value: Number(action.options.param) },
				]),
		},

		strip_plugin_activate: {
			name: 'Strip: Activate Plugin',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'number',
					id: 'plugin',
					label: 'Plugin Number',
					default: 1,
					min: 1,
					max: 64,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/plugin/activate', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'i', value: Number(action.options.plugin) },
				]),
		},

		strip_plugin_deactivate: {
			name: 'Strip: Deactivate Plugin',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'number',
					id: 'plugin',
					label: 'Plugin Number',
					default: 1,
					min: 1,
					max: 64,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/plugin/deactivate', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'i', value: Number(action.options.plugin) },
				]),
		},

		strip_send_gain: {
			name: 'Strip: Set Send Gain (dB)',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'number',
					id: 'send',
					label: 'Send Number',
					default: 1,
					min: 1,
					max: 64,
				},
				{
					type: 'number',
					id: 'gain',
					label: 'Gain (dB)',
					default: 0,
					min: -193,
					max: 6,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/send/gain', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'i', value: Number(action.options.send) },
					{ type: 'f', value: Number(action.options.gain) },
				]),
		},

		strip_send_fader: {
			name: 'Strip: Set Send Fader',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'number',
					id: 'send',
					label: 'Send Number',
					default: 1,
					min: 1,
					max: 64,
				},
				{
					type: 'number',
					id: 'fader',
					label: 'Fader Position (0.0–2.0)',
					default: 1,
					min: 0,
					max: 2,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/send/fader', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'i', value: Number(action.options.send) },
					{ type: 'f', value: Number(action.options.fader) },
				]),
		},

		strip_send_enable: {
			name: 'Strip: Send Enable',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'number',
					id: 'send',
					label: 'Send Number',
					default: 1,
					min: 1,
					max: 64,
				},
				{
					type: 'dropdown',
					id: 'enable',
					label: 'Enable',
					default: 1,
					choices: ON_OFF_CHOICES,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/send/enable', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'i', value: Number(action.options.send) },
					{ type: 'f', value: Number(action.options.enable) },
				]),
		},

		strip_name: {
			name: 'Strip: Set Name',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'textinput',
					id: 'name',
					label: 'Name',
					default: '',
				},
			],
			callback: (action) =>
				self.osc.send('/strip/name', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 's', value: String(action.options.name ?? '') },
				]),
		},

		strip_sends: {
			name: 'Strip: Query Sends',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/sends', [{ type: 'i', value: Number(action.options.strip) }]),
		},

		strip_receives: {
			name: 'Strip: Query Receives',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/receives', [{ type: 'i', value: Number(action.options.strip) }]),
		},

		strip_plugin_list: {
			name: 'Strip: Query Plugin List',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/plugin/list', [{ type: 'i', value: Number(action.options.strip) }]),
		},

		strip_plugin_descriptor: {
			name: 'Strip: Query Plugin Descriptor',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'number',
					id: 'plugin',
					label: 'Plugin Number',
					default: 1,
					min: 1,
					max: 64,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/plugin/descriptor', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'i', value: Number(action.options.plugin) },
				]),
		},

		strip_plugin_reset: {
			name: 'Strip: Reset Plugin',
			options: [
				{
					type: 'number',
					id: 'strip',
					label: 'Strip Number',
					default: 1,
					min: 1,
					max: 256,
				},
				{
					type: 'number',
					id: 'plugin',
					label: 'Plugin Number',
					default: 1,
					min: 1,
					max: 64,
				},
			],
			callback: (action) =>
				self.osc.send('/strip/plugin/reset', [
					{ type: 'i', value: Number(action.options.strip) },
					{ type: 'i', value: Number(action.options.plugin) },
				]),
		},

		// ─── MISCELLANEOUS ────────────────────────────────────────────────────────

		refresh: {
			name: 'Misc: Refresh State',
			options: [],
			callback: () => self.osc.send('/refresh'),
		},

		strip_list: {
			name: 'Misc: Request Strip List',
			options: [],
			callback: () => self.osc.send('/strip/list'),
		},
	}

	self.setActionDefinitions(actions)
}
