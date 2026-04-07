import { InstanceBase, runEntrypoint, InstanceStatus, type SomeCompanionConfigField } from '@companion-module/base'
import { GetConfigFields, type ModuleConfig } from './config.js'
import { UpdateVariableDefinitions } from './variables.js'
import { UpgradeScripts } from './upgrades.js'
import { UpdateActions } from './actions.js'
import { UpdateFeedbacks } from './feedbacks.js'
import { UpdatePresets } from './presets.js'
import { OscClient, type OscArg } from './osc.js'

export interface LiveTraxState {
	transport_play: number
	transport_stop: number
	record_tally: number
	loop: number
	punch_in: number
	punch_out: number
	click: number
	select_mute: number
	select_solo: number
	select_recenable: number
}

const DEFAULT_STATE: LiveTraxState = {
	transport_play: 0,
	transport_stop: 1,
	record_tally: 0,
	loop: 0,
	punch_in: 0,
	punch_out: 0,
	click: 0,
	select_mute: 0,
	select_solo: 0,
	select_recenable: 0,
}

export class ModuleInstance extends InstanceBase<ModuleConfig> {
	config!: ModuleConfig
	osc!: OscClient
	state: LiveTraxState = { ...DEFAULT_STATE }

	constructor(internal: unknown) {
		super(internal)
	}

	async init(config: ModuleConfig): Promise<void> {
		this.config = config
		this.state = { ...DEFAULT_STATE }

		this.osc = new OscClient(config.host, config.targetPort)
		this.osc.open()
		this.osc.listen(config.feedbackPort ?? 8000, this.handleOscMessage.bind(this))

		this.updateStatus(InstanceStatus.Ok)
		this.updateActions()
		this.updateFeedbacks()
		this.updatePresets()
		this.updateVariableDefinitions()

		// Request initial state from LiveTrax
		setTimeout(() => this.osc.send('/refresh'), 500)
	}

	async destroy(): Promise<void> {
		this.osc?.close()
		this.log('debug', 'destroy')
	}

	async configUpdated(config: ModuleConfig): Promise<void> {
		const portChanged = config.feedbackPort !== this.config.feedbackPort
		this.config = config
		this.osc.updateTarget(config.host, config.targetPort)
		if (portChanged) {
			this.osc.listen(config.feedbackPort, this.handleOscMessage.bind(this))
		}
	}

	handleOscMessage(address: string, args: OscArg[]): void {
		const f0 = args[0]?.type === 'f' ? args[0].value : undefined
		const s0 = args[0]?.type === 's' ? args[0].value : undefined

		switch (address) {
			case '/position/smpte':
				if (s0 !== undefined) this.setVariableValues({ position_smpte: s0 })
				break
			case '/position/bbt':
				if (s0 !== undefined) this.setVariableValues({ position_bbt: s0 })
				break
			case '/position/time':
				if (s0 !== undefined) this.setVariableValues({ position_time: s0 })
				break
			case '/position/samples':
				if (s0 !== undefined) this.setVariableValues({ position_samples: s0 })
				break
			case '/transport_play':
				if (f0 !== undefined) {
					this.state.transport_play = f0
					this.setVariableValues({ transport_play: f0 })
					this.checkFeedbacks('transport_playing')
				}
				break
			case '/transport_stop':
				if (f0 !== undefined) {
					this.state.transport_stop = f0
					this.setVariableValues({ transport_stop: f0 })
					this.checkFeedbacks('transport_stopped')
				}
				break
			case '/record_tally':
				if (f0 !== undefined) {
					this.state.record_tally = f0
					this.setVariableValues({ record_tally: f0 })
					this.checkFeedbacks('record_tally')
				}
				break
			case '/loop_toggle':
				if (f0 !== undefined) {
					this.state.loop = f0
					this.setVariableValues({ loop: f0 })
					this.checkFeedbacks('loop_active')
				}
				break
			case '/toggle_punch_in':
				if (f0 !== undefined) {
					this.state.punch_in = f0
					this.setVariableValues({ punch_in: f0 })
					this.checkFeedbacks('punch_in')
				}
				break
			case '/toggle_punch_out':
				if (f0 !== undefined) {
					this.state.punch_out = f0
					this.setVariableValues({ punch_out: f0 })
					this.checkFeedbacks('punch_out')
				}
				break
			case '/toggle_click':
				if (f0 !== undefined) {
					this.state.click = f0
					this.setVariableValues({ click: f0 })
					this.checkFeedbacks('click_active')
				}
				break
			case '/session_name':
				if (s0 !== undefined) this.setVariableValues({ session_name: s0 })
				break
			case '/marker':
				if (s0 !== undefined) this.setVariableValues({ marker: s0 })
				break
			case '/select/name':
				if (s0 !== undefined) this.setVariableValues({ select_name: s0 })
				break
			case '/select/gain':
				if (f0 !== undefined) this.setVariableValues({ select_gain: Math.round(f0 * 10) / 10 })
				break
			case '/select/fader':
				if (f0 !== undefined) this.setVariableValues({ select_fader: Math.round(f0 * 100) / 100 })
				break
			case '/select/meter':
				if (f0 !== undefined) this.setVariableValues({ select_meter: Math.round(f0 * 10) / 10 })
				break
			case '/select/mute':
				if (f0 !== undefined) {
					this.state.select_mute = f0
					this.setVariableValues({ select_mute: f0 })
					this.checkFeedbacks('select_mute')
				}
				break
			case '/select/solo':
				if (f0 !== undefined) {
					this.state.select_solo = f0
					this.setVariableValues({ select_solo: f0 })
					this.checkFeedbacks('select_solo')
				}
				break
			case '/select/recenable':
				if (f0 !== undefined) {
					this.state.select_recenable = f0
					this.setVariableValues({ select_recenable: f0 })
					this.checkFeedbacks('select_recenable')
				}
				break
			case '/master/gain':
				if (f0 !== undefined) this.setVariableValues({ master_gain: Math.round(f0 * 10) / 10 })
				break
			case '/master/meter':
				if (f0 !== undefined) this.setVariableValues({ master_meter: Math.round(f0 * 10) / 10 })
				break
			case '/jog/mode/name':
				if (s0 !== undefined) this.setVariableValues({ jog_mode: s0 })
				break
		}
	}

	getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}

	updateActions(): void {
		UpdateActions(this)
	}

	updateFeedbacks(): void {
		UpdateFeedbacks(this)
	}

	updatePresets(): void {
		UpdatePresets(this)
	}

	updateVariableDefinitions(): void {
		UpdateVariableDefinitions(this)
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
