// Sleek procedural cybernetic audio feedback engine utilizing Web Audio API.
// Generates minimal high-end designer audio clicks, deep feedback, and luxury chords.

class SoundHub {
    private ctx: AudioContext | null = null;
    private enabled: boolean = false;

    constructor() {
        // AudioContext is lazily initialized on user interaction
    }

    private initContext() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    public toggle(state?: boolean) {
        this.enabled = state !== undefined ? state : !this.enabled;
        if (this.enabled) {
            this.initContext();
            this.playTick();
        }
        return this.enabled;
    }

    public isEnabled() {
        return this.enabled;
    }

    public playTick() {
        if (!this.enabled) return;
        try {
            this.initContext();
            if (!this.ctx) return;

            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(1200, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);

            gain.gain.setValueAtTime(0.015, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.05);
        } catch (e) {
            console.warn('Audio check blocked or failed', e);
        }
    }

    public playHaptic() {
        if (!this.enabled) return;
        try {
            this.initContext();
            if (!this.ctx) return;

            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(350, now + 0.08);

            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.08);
        } catch (e) {
            console.warn(e);
        }
    }

    public playSwoosh() {
        if (!this.enabled) return;
        try {
            this.initContext();
            if (!this.ctx) return;

            const now = this.ctx.currentTime;
            
            // Create bandpass noise for organic luxury feel
            const bufferSize = this.ctx.sampleRate * 0.2; // 200ms
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noiseNode = this.ctx.createBufferSource();
            noiseNode.buffer = buffer;

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(200, now);
            filter.frequency.exponentialRampToValueAtTime(1200, now + 0.18);
            filter.Q.setValueAtTime(2.0, now);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.025, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

            noiseNode.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            noiseNode.start(now);
            noiseNode.stop(now + 0.2);
        } catch (e) {
            console.warn(e);
        }
    }

    public playSuccess() {
        if (!this.enabled) return;
        try {
            this.initContext();
            if (!this.ctx) return;

            const now = this.ctx.currentTime;
            const rootFreq = 261.63; // C4
            const notes = [1, 1.25, 1.5, 1.875]; // Root, Major 3rd, Perfect 5th, Major 7th

            notes.forEach((ratio, i) => {
                const osc = this.ctx!.createOscillator();
                const gain = this.ctx!.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(rootFreq * ratio * 2, now + i * 0.05);

                gain.gain.setValueAtTime(0.008, now + i * 0.05);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.4);

                osc.connect(gain);
                gain.connect(this.ctx!.destination);

                osc.start(now + i * 0.05);
                osc.stop(now + i * 0.05 + 0.4);
            });
        } catch (e) {
            console.warn(e);
        }
    }
}

export const audioEngine = new SoundHub();
