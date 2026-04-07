import { combineRgb } from '@companion-module/base'
import type { ModuleInstance } from './main.js'

export function UpdateFeedbacks(self: ModuleInstance): void {
	self.setFeedbackDefinitions({
		transport_playing: {
			name: 'Transport: Playing',
			type: 'boolean',
			defaultStyle: { bgcolor: combineRgb(0, 200, 0), color: combineRgb(0, 0, 0) },
			options: [],
			callback: () => self.state.transport_play === 1,
		},
		transport_stopped: {
			name: 'Transport: Stopped',
			type: 'boolean',
			defaultStyle: { bgcolor: combineRgb(200, 0, 0), color: combineRgb(255, 255, 255) },
			options: [],
			callback: () => self.state.transport_stop === 1,
		},
		record_tally: {
			name: 'Transport: Recording',
			type: 'boolean',
			defaultStyle: { bgcolor: combineRgb(220, 0, 0), color: combineRgb(255, 255, 255) },
			options: [],
			callback: () => self.state.record_tally === 1,
		},
		loop_active: {
			name: 'Transport: Loop Active',
			type: 'boolean',
			defaultStyle: { bgcolor: combineRgb(0, 100, 220), color: combineRgb(255, 255, 255) },
			options: [],
			callback: () => self.state.loop === 1,
		},
		punch_in: {
			name: 'Transport: Punch In Active',
			type: 'boolean',
			defaultStyle: { bgcolor: combineRgb(220, 120, 0), color: combineRgb(255, 255, 255) },
			options: [],
			callback: () => self.state.punch_in === 1,
		},
		punch_out: {
			name: 'Transport: Punch Out Active',
			type: 'boolean',
			defaultStyle: { bgcolor: combineRgb(220, 120, 0), color: combineRgb(255, 255, 255) },
			options: [],
			callback: () => self.state.punch_out === 1,
		},
		click_active: {
			name: 'Transport: Click/Metronome Active',
			type: 'boolean',
			defaultStyle: { bgcolor: combineRgb(180, 180, 0), color: combineRgb(0, 0, 0) },
			options: [],
			callback: () => self.state.click === 1,
		},
		select_mute: {
			name: 'Selected Strip: Muted',
			type: 'boolean',
			defaultStyle: { bgcolor: combineRgb(220, 0, 0), color: combineRgb(255, 255, 255) },
			options: [],
			callback: () => self.state.select_mute === 1,
		},
		select_solo: {
			name: 'Selected Strip: Soloed',
			type: 'boolean',
			defaultStyle: { bgcolor: combineRgb(220, 180, 0), color: combineRgb(0, 0, 0) },
			options: [],
			callback: () => self.state.select_solo === 1,
		},
		select_recenable: {
			name: 'Selected Strip: Record Enabled',
			type: 'boolean',
			defaultStyle: { bgcolor: combineRgb(220, 0, 0), color: combineRgb(255, 255, 255) },
			options: [],
			callback: () => self.state.select_recenable === 1,
		},
	})
}
