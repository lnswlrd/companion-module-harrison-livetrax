import dgram from 'node:dgram'

export type OscArg = { type: 'i'; value: number } | { type: 'f'; value: number } | { type: 's'; value: string }

export type OscMessageHandler = (address: string, args: OscArg[]) => void

function padTo4(buf: Buffer): Buffer {
	const len = Math.ceil(buf.length / 4) * 4
	const padded = Buffer.alloc(len)
	buf.copy(padded)
	return padded
}

function encodeString(str: string): Buffer {
	return padTo4(Buffer.from(str + '\0', 'utf8'))
}

function parseString(buf: Buffer, offset: number): { value: string; nextOffset: number } {
	const end = buf.indexOf(0, offset)
	const value = buf.toString('utf8', offset, end)
	const nextOffset = offset + Math.ceil((end - offset + 1) / 4) * 4
	return { value, nextOffset }
}

function parseMessage(buf: Buffer): { address: string; args: OscArg[] } | null {
	try {
		const addr = parseString(buf, 0)
		const tags = parseString(buf, addr.nextOffset)
		const typetags = tags.value.startsWith(',') ? tags.value.substring(1) : tags.value
		let offset = tags.nextOffset
		const args: OscArg[] = []
		for (const t of typetags) {
			if (t === 'i') {
				args.push({ type: 'i', value: buf.readInt32BE(offset) })
				offset += 4
			} else if (t === 'f') {
				args.push({ type: 'f', value: buf.readFloatBE(offset) })
				offset += 4
			} else if (t === 's') {
				const s = parseString(buf, offset)
				args.push({ type: 's', value: s.value })
				offset = s.nextOffset
			}
			// skip unknown types
		}
		return { address: addr.value, args }
	} catch {
		return null
	}
}

function buildMessage(address: string, args: OscArg[]): Buffer {
	const typetag = ',' + args.map((a) => a.type).join('')
	const parts: Buffer[] = [encodeString(address), encodeString(typetag)]
	for (const arg of args) {
		if (arg.type === 'i') {
			const buf = Buffer.alloc(4)
			buf.writeInt32BE(arg.value)
			parts.push(buf)
		} else if (arg.type === 'f') {
			const buf = Buffer.alloc(4)
			buf.writeFloatBE(arg.value)
			parts.push(buf)
		} else {
			parts.push(encodeString(arg.value))
		}
	}
	return Buffer.concat(parts)
}

export class OscClient {
	private sendSocket: dgram.Socket | null = null
	private listenSocket: dgram.Socket | null = null
	private host: string
	private port: number

	constructor(host: string, port: number) {
		this.host = host
		this.port = port
	}

	send(address: string, args: OscArg[] = []): void {
		if (!this.sendSocket) return
		const msg = buildMessage(address, args)
		this.sendSocket.send(msg, 0, msg.length, this.port, this.host, (err) => {
			if (err) console.error(`OSC send error to ${this.host}:${this.port}:`, err)
		})
	}

	open(): void {
		this.close()
		this.sendSocket = dgram.createSocket('udp4')
		this.sendSocket.on('error', (err) => {
			console.error('OSC send socket error:', err)
			this.sendSocket?.close()
			this.sendSocket = null
		})
		this.sendSocket.bind()
	}

	listen(port: number, onMessage: OscMessageHandler): void {
		if (this.listenSocket) {
			try {
				this.listenSocket.close()
			} catch {
				// ignore
			}
		}
		this.listenSocket = dgram.createSocket('udp4')
		this.listenSocket.on('error', (err) => {
			console.error('OSC listen socket error:', err)
		})
		this.listenSocket.on('message', (buf) => {
			const msg = parseMessage(buf)
			if (msg) onMessage(msg.address, msg.args)
		})
		this.listenSocket.bind(port, () => {
			console.log(`OSC listening on UDP port ${port}`)
		})
	}

	close(): void {
		if (this.sendSocket) {
			try {
				this.sendSocket.close()
			} catch {
				// ignore
			}
			this.sendSocket = null
		}
		if (this.listenSocket) {
			try {
				this.listenSocket.close()
			} catch {
				// ignore
			}
			this.listenSocket = null
		}
	}

	updateTarget(host: string, port: number): void {
		this.host = host
		this.port = port
	}
}
