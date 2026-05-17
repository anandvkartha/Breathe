// app.js

const PRESETS = {
    'Micro-Break': [{ type: 'Micro-Break', duration: 60, inhale: 5, hold: 0, exhale: 5, hold2: 0 }, { type: 'Micro-Break', duration: 60, inhale: 4, hold: 0, exhale: 8, hold2: 0 }],
    'Calm': [{ type: 'Calm', duration: 300, inhale: 4, hold: 0, exhale: 6, hold2: 0 }],
    'Coherence-5': [{ type: 'Coherence-5', duration: 300, inhale: 5, hold: 0, exhale: 5, hold2: 0 }],
    'Box-5': [{ type: 'Box-5', duration: 300, inhale: 5, hold: 5, exhale: 5, hold2: 5 }],
    '4-7-8': [{ type: '4-7-8', duration: 300, inhale: 4, hold: 7, exhale: 8, hold2: 0 }],
    'Energize': [{ type: 'Energize', duration: 180, inhale: 6, hold: 0, exhale: 2, hold2: 0 }],
    'Rapid Eye Movement': [{ type: 'Rapid Eye Movement', duration: 180, inhale: 4, hold: 0, exhale: 4, hold2: 0 }],
    'Creative Upgaze': [{ type: 'Creative Upgaze', duration: 180, inhale: 4, hold: 2, exhale: 4, hold2: 0 }],
    'Introspective Downgaze': [{ type: 'Introspective Downgaze', duration: 180, inhale: 4, hold: 0, exhale: 6, hold2: 0 }],
    'Rapid Eye Movement + Box-5': [
        { type: 'Rapid Eye Movement', duration: 120, inhale: 4, hold: 0, exhale: 4, hold2: 0 },
        { type: 'Box-5', duration: 180, inhale: 5, hold: 5, exhale: 5, hold2: 5 }
    ],
    'Energize + Upgaze': [
        { type: 'Energize', duration: 120, inhale: 6, hold: 0, exhale: 2, hold2: 0 },
        { type: 'Creative Upgaze', duration: 120, inhale: 4, hold: 2, exhale: 4, hold2: 0 }
    ],
    '4-7-8 + Ocean Trance': [
        { type: '4-7-8', duration: 300, inhale: 4, hold: 7, exhale: 8, hold2: 0 },
        { type: 'Ocean Trance', duration: 900 }
    ],
    'Desk Mobility': [
        { duration: 30, type: 'Desk Mobility', mobilityType: 'neck', name: 'Gentle Neck Stretches' },
        { duration: 30, type: 'Desk Mobility', mobilityType: 'torso', name: 'Slow Torso Twists' },
        { duration: 30, type: 'Desk Mobility', mobilityType: 'reach', name: 'Deep Arm Reaches' },
        { duration: 30, type: 'Desk Mobility', mobilityType: 'rest', name: 'Rest and relax' }
    ],
    '7-Min Calisthenics': [
        { duration: 15, type: '7-Min Calisthenics', mobilityType: 'setup-jumping-jacks', name: 'Jumping Jacks', instruction: 'Stand upright, legs together, arms at your sides.' },
        { duration: 30, type: '7-Min Calisthenics', mobilityType: 'jumping-jacks', name: 'Jumping Jacks' },
        { duration: 20, type: '7-Min Calisthenics', mobilityType: 'rest', name: 'Rest' },
        { duration: 15, type: '7-Min Calisthenics', mobilityType: 'setup-wall-sit', name: 'Wall Sit', instruction: 'Lean flat against a wall, slide down until knees are 90 degrees.' },
        { duration: 30, type: '7-Min Calisthenics', mobilityType: 'wall-sit', name: 'Wall Sit' },
        { duration: 20, type: '7-Min Calisthenics', mobilityType: 'rest', name: 'Rest' },
        { duration: 15, type: '7-Min Calisthenics', mobilityType: 'setup-pushups', name: 'Push-ups', instruction: 'Place hands slightly wider than shoulders, keep body straight.' },
        { duration: 30, type: '7-Min Calisthenics', mobilityType: 'pushups', name: 'Push-ups' },
        { duration: 20, type: '7-Min Calisthenics', mobilityType: 'rest', name: 'Rest' },
        { duration: 15, type: '7-Min Calisthenics', mobilityType: 'setup-crunches', name: 'Crunches', instruction: 'Lie on your back, knees bent, hands gently behind your ears.' },
        { duration: 30, type: '7-Min Calisthenics', mobilityType: 'crunches', name: 'Crunches' },
        { duration: 20, type: '7-Min Calisthenics', mobilityType: 'rest', name: 'Rest' },
        { duration: 15, type: '7-Min Calisthenics', mobilityType: 'setup-step-ups', name: 'Step-ups', instruction: 'Face a sturdy chair, place one foot fully on the seat.' },
        { duration: 30, type: '7-Min Calisthenics', mobilityType: 'step-ups', name: 'Step-ups' },
        { duration: 20, type: '7-Min Calisthenics', mobilityType: 'rest', name: 'Rest' },
        { duration: 15, type: '7-Min Calisthenics', mobilityType: 'setup-squats', name: 'Squats', instruction: 'Feet shoulder-width apart, keep your chest up and back straight.' },
        { duration: 30, type: '7-Min Calisthenics', mobilityType: 'squats', name: 'Squats' },
        { duration: 20, type: '7-Min Calisthenics', mobilityType: 'rest', name: 'Rest' },
        { duration: 15, type: '7-Min Calisthenics', mobilityType: 'setup-triceps-dips', name: 'Triceps Dips', instruction: 'Hands on edge of a chair, legs extended, prepare to lower body.' },
        { duration: 30, type: '7-Min Calisthenics', mobilityType: 'triceps-dips', name: 'Triceps Dips' },
        { duration: 20, type: '7-Min Calisthenics', mobilityType: 'rest', name: 'Rest' },
        { duration: 15, type: '7-Min Calisthenics', mobilityType: 'setup-plank', name: 'Plank', instruction: 'Forearms on the floor, elbows under shoulders, back straight.' },
        { duration: 30, type: '7-Min Calisthenics', mobilityType: 'plank', name: 'Plank' },
        { duration: 20, type: '7-Min Calisthenics', mobilityType: 'rest', name: 'Rest' },
        { duration: 15, type: '7-Min Calisthenics', mobilityType: 'setup-high-knees', name: 'High Knees', instruction: 'Stand tall, bring your knees up to your chest alternatively.' },
        { duration: 30, type: '7-Min Calisthenics', mobilityType: 'high-knees', name: 'High Knees' },
        { duration: 20, type: '7-Min Calisthenics', mobilityType: 'rest', name: 'Rest' },
        { duration: 15, type: '7-Min Calisthenics', mobilityType: 'setup-lunges', name: 'Lunges', instruction: 'Step forward, lower hips until knees are 90 degrees.' },
        { duration: 30, type: '7-Min Calisthenics', mobilityType: 'lunges', name: 'Lunges' },
        { duration: 20, type: '7-Min Calisthenics', mobilityType: 'rest', name: 'Rest' },
        { duration: 15, type: '7-Min Calisthenics', mobilityType: 'setup-pushup-rotation', name: 'Push-up & Rotation', instruction: 'Start in push-up position, prepare to rotate and raise one arm up.' },
        { duration: 30, type: '7-Min Calisthenics', mobilityType: 'pushup-rotation', name: 'Push-up & Rotation' },
        { duration: 20, type: '7-Min Calisthenics', mobilityType: 'rest', name: 'Rest' },
        { duration: 15, type: '7-Min Calisthenics', mobilityType: 'setup-side-plank', name: 'Side Plank', instruction: 'Lie on your side, prop up on one forearm, body straight.' },
        { duration: 30, type: '7-Min Calisthenics', mobilityType: 'side-plank', name: 'Side Plank' }
    ]
};

const state = {
    preset: 'Micro-Break',
    sound: 'Ocean',
    volume: 30,
    countdown: 8,
    stages: Array.from(PRESETS['Micro-Break'].map(s => ({ ...s }))),
    sessionActive: false,
};

// DOM Elements
const DOM = {
    landingView: document.getElementById('landing-view'),
    tabMood: document.getElementById('tab-mood'),
    postSession: document.getElementById('post-session'),
    postBetterBtn: document.getElementById('post-better-btn'),
    postSameBtn: document.getElementById('post-same-btn'),
    earlyFinishBtn: document.getElementById('early-finish-btn'),
    activeSession: document.getElementById('active-session'),
    stopBtn: document.getElementById('stop-session-btn'),

    volumeControls: document.getElementById('volume-controls'),
    breathingCircle: document.getElementById('breathing-circle'),
    eyeDot: document.getElementById('eye-dot'),
    postureReminder: document.getElementById('posture-reminder'),
    mobilityFigure: document.getElementById('mobility-figure'),
    figHead: document.getElementById('fig-head'),
    figGroup: document.getElementById('fig-group'),
    figArmL: document.getElementById('fig-arml'),
    figArmR: document.getElementById('fig-armr'),
    sessionContent: document.getElementById('session-content'),
    sessionInstruction: document.getElementById('session-instruction'),
    sessionTimerDisplay: document.getElementById('session-timer-display'),
    stageInfo: document.getElementById('stage-info'),
    sessionTotalTimer: document.getElementById('session-total-timer'),
};

const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m > 0 && s === 0) return `${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
};

const formatTimeSpan = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
};

// ----------------------------------------------------
// Wake Lock Management
// ----------------------------------------------------
let wakeLock = null;

const requestWakeLock = async () => {
    try {
        if ('wakeLock' in navigator) {
            wakeLock = await navigator.wakeLock.request('screen');
        }
    } catch (err) {
        console.error(`Wake Lock error: ${err.name}, ${err.message}`);
    }
};

const releaseWakeLock = async () => {
    if (wakeLock !== null) {
        await wakeLock.release();
        wakeLock = null;
    }
};

document.addEventListener('visibilitychange', async () => {
    if (state.sessionActive && wakeLock !== null && document.visibilityState === 'visible') {
        requestWakeLock();
    }
});

// ----------------------------------------------------
// Initialization & History
// ----------------------------------------------------

const setupChipGroup = (container, activeValue, onChange) => {
    const activeClass = container.id === 'volume-controls' ? 'active-blue' : 'active';
    const buttons = container.querySelectorAll('.chip, .mood-card');
    buttons.forEach(btn => {
        const val = btn.dataset.preset || btn.textContent.trim();
        btn.classList.toggle(activeClass, val === activeValue.toString());
        if (activeClass === 'active') btn.classList.remove('active-blue');
        if (activeClass === 'active-blue') btn.classList.remove('active');

        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', (e) => {
            const newVal = newBtn.dataset.preset || newBtn.textContent.trim();
            onChange(newVal);
            setupChipGroup(container, newVal, onChange);
            
            if (e.target.closest('.play-arrow') && typeof beginSession === 'function') {
                beginSession();
            }
        });

        newBtn.addEventListener('dblclick', (e) => {
            const newVal = newBtn.dataset.preset || newBtn.textContent.trim();
            onChange(newVal);
            setupChipGroup(container, newVal, onChange);
            
            if (typeof beginSession === 'function') {
                beginSession();
            }
        });
    });
};

const volMap = { '0': 0, '1': 30, '2': 70, '3': 100 };
const invVolMap = { 0: '0', 30: '1', 70: '2', 100: '3' };

setupChipGroup(DOM.volumeControls, invVolMap[state.volume] || '1', (val) => {
    state.volume = volMap[val] !== undefined ? volMap[val] : 30;
});

const PRESET_EXPLANATIONS = {
    'Box-5': {
        title: 'Why use Box Breathing?',
        points: [
            'Jumpstarts the nervous system with structured oxygen flow',
            'Clears morning brain fog',
            'Creates a steady, calm foundation for the day'
        ]
    },
    '4-7-8 + Ocean Trance': {
        title: 'Why use 4-7-8 Breathing?',
        points: [
            'Acts as a natural tranquilizer for the nervous system',
            'Prolonged exhalation activates the parasympathetic (rest) response',
            'Rhythmic ocean sounds lower heart rate and induce deep relaxation'
        ]
    },
    'Rapid Eye Movement + Box-5': {
        title: 'Why use Rapid Eye Movement (REM)?',
        points: [
            'Rapidly reduces intense anxiety and panic',
            'Breaks negative thought loops and rumination',
            'Helps reprocess heavy emotional blocks',
            'Anchors and grounds you physically in the present'
        ]
    },
    'Energize + Upgaze': {
        title: 'Why use Energize & Upgaze?',
        points: [
            'Looking up activates creative problem-solving pathways',
            'Rapid inhales simulate excitement, boosting energy',
            'Lifts mood and breaks downward-looking posture'
        ]
    },
    'Coherence-5': {
        title: 'Why use Coherence Breathing?',
        points: [
            'Synchronizes heart rate with breathing rhythm',
            'Balances the nervous system, bringing focus',
            'Cultivates grounded, clear-headed presence'
        ]
    },
    'Calm': {
        title: 'Why use the Physiological Sigh?',
        points: [
            'Double inhales fully inflate the lungs, popping open alveoli',
            'Long sighs offload built-up carbon dioxide quickly',
            'Instantly signals the brain that you are safe'
        ]
    },
    'Micro-Break': {
        title: 'Why use a Micro-Break?',
        points: [
            'Provides a quick neurological reset between tasks',
            'Relieves shallow chest breathing caused by screen time',
            'Restores cognitive capacity and attention'
        ]
    },
    'Desk Mobility': {
        title: 'Why use Desk Mobility?',
        points: [
            'Flushes stagnant blood and lymphatic fluid',
            'Releases physical tension stored in the neck and shoulders',
            'Reconnects the brain to the physical body'
        ]
    },
    '7-Min Calisthenics': {
        title: 'Why use the 7-Min Calisthenics Routine?',
        points: [
            'Scientifically designed to provide maximum benefits in minimal time',
            'Combines aerobic and resistance training for full-body engagement',
            'Improves cardiovascular health and muscle tone quickly'
        ]
    }
};

// Mood Selector Routing
document.querySelectorAll('#tab-mood .mood-card').forEach(card => {
    const textGroup = card.querySelector('.mood-text-group');
    if (textGroup) {
        card.dataset.originalHtml = textGroup.innerHTML;
    }

    card.addEventListener('click', (e) => {
        if (e.target.closest('.play-arrow') && typeof beginSession === 'function') {
            const selectedPreset = card.dataset.preset;
            state.preset = selectedPreset;
            state.stages = Array.from(PRESETS[state.preset].map(s => ({ ...s })));
            DOM.landingView.classList.remove('active');
            beginSession();
            return;
        }

        const selectedPreset = card.dataset.preset;
        state.preset = selectedPreset;
        state.stages = Array.from(PRESETS[state.preset].map(s => ({ ...s })));
        
        document.querySelectorAll('#tab-mood .mood-card').forEach(c => {
            const isActive = c.dataset.preset === state.preset;
            c.classList.toggle('active', isActive);
            
            const tg = c.querySelector('.mood-text-group');
            if (isActive && PRESET_EXPLANATIONS[state.preset]) {
                const expl = PRESET_EXPLANATIONS[state.preset];
                tg.innerHTML = `<span style="font-weight: 600; color: var(--accent-blue); display: block; margin-bottom: 0.5rem;">${expl.title}</span><ul style="margin: 0; padding-left: 1.2rem; font-size: 0.8rem; text-align: left; list-style-type: disc; color: var(--text-main); line-height: 1.5;">${expl.points.map(p => `<li>${p}</li>`).join('')}</ul>`;
            } else if (tg && c.dataset.originalHtml) {
                tg.innerHTML = c.dataset.originalHtml;
            }
        });
    });



    card.addEventListener('dblclick', () => {
        const selectedPreset = card.dataset.preset;
        state.preset = selectedPreset;
        state.stages = Array.from(PRESETS[state.preset].map(s => ({ ...s })));
        
        if (typeof beginSession === 'function') {
            DOM.landingView.classList.remove('active');
            beginSession();
        }
    });
});

// Global click to deselect
document.addEventListener('click', (e) => {
    if (DOM.landingView.classList.contains('active')) {
        const clickedCard = e.target.closest('.mood-card');
        const clickedPresetChip = e.target.closest('#preset-controls .chip');
        const clickedVolumeChip = e.target.closest('#volume-controls .chip');
        const clickedTab = e.target.closest('.tab-btn');
        
        if (!clickedCard && !clickedVolumeChip && !clickedTab) {
            document.querySelectorAll('#tab-mood .mood-card').forEach(c => {
                c.classList.remove('active');
                c.classList.remove('active-blue');
                const tg = c.querySelector('.mood-text-group');
                if (tg && c.dataset.originalHtml) {
                    tg.innerHTML = c.dataset.originalHtml;
                }
            });
        }
    }
});

const renderCalendar = () => {
    const history = JSON.parse(localStorage.getItem('breathe_logs') || '[]');
    const heatmap = document.getElementById('calendar-heatmap');
    if (!heatmap) return;
    heatmap.innerHTML = '';

    const today = new Date();
    // 30 day history
    for (let i = 29; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];

        const daySessions = history.filter(ts => new Date(ts).toISOString().split('T')[0] === dateStr);

        const dot = document.createElement('div');
        dot.style.width = '24px';
        dot.style.height = '24px';
        dot.style.borderRadius = '50%';
        dot.style.background = 'rgba(255,255,255,0.05)';
        dot.style.display = 'flex';
        dot.style.alignItems = 'center';
        dot.style.justifyContent = 'center';
        dot.style.fontSize = '0.75rem';
        dot.style.color = '#ffffff';
        dot.style.fontWeight = 'bold';

        if (daySessions.length > 0) {
            dot.style.background = '#34a853'; // Material Green
            dot.style.boxShadow = '0 0 10px rgba(52, 168, 83, 0.4)';
            dot.textContent = daySessions.length;
        }

        dot.title = `${dateStr}: ${daySessions.length} session(s)`;
        heatmap.appendChild(dot);
    }
};

DOM.postBetterBtn.addEventListener('click', () => {
    const history = JSON.parse(localStorage.getItem('breathe_logs') || '[]');
    history.push(new Date().toISOString());
    localStorage.setItem('breathe_logs', JSON.stringify(history));

    DOM.postSession.classList.remove('active');
    document.getElementById('stats-view').classList.add('active');
    renderCalendar();
});

DOM.postSameBtn.addEventListener('click', () => {
    DOM.postSession.classList.remove('active');
    DOM.landingView.classList.add('active');
});

document.getElementById('close-stats-btn').addEventListener('click', () => {
    document.getElementById('stats-view').classList.remove('active');
    DOM.landingView.classList.add('active');
});

// ----------------------------------------------------
// Breathing Engine & Polished Web Audio Synthesis
// ----------------------------------------------------
let engineInterval;

let audioCtx;
let oceanOsc, oceanGain, oceanFilter;

const initAudio = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        const bufferSize = audioCtx.sampleRate * 2;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        oceanOsc = audioCtx.createBufferSource();
        oceanOsc.buffer = buffer;
        oceanOsc.loop = true;
        
        oceanFilter = audioCtx.createBiquadFilter();
        oceanFilter.type = 'lowpass';
        oceanFilter.frequency.value = 400; // Deep ocean sound
        
        oceanGain = audioCtx.createGain();
        oceanGain.gain.value = 0;
        
        oceanOsc.connect(oceanFilter);
        oceanFilter.connect(oceanGain);
        oceanGain.connect(audioCtx.destination);
        oceanOsc.start();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
};

const playBeep = (freq = 440, type = 'sine', duration = 0.5, volMultiplier = 1) => {
    if (state.volume <= 0 || state.sound === 'Off') return;
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    const maxVol = (state.volume / 100) * 0.1 * volMultiplier;
    gain.gain.linearRampToValueAtTime(maxVol, audioCtx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
};

let workoutInterval;
const startWorkoutMusic = () => {
    if (state.volume <= 0) return;
    initAudio();
    const bpm = 120;
    const beatDuration = 60 / bpm;
    let nextNoteTime = audioCtx.currentTime + 0.1;

    const playKick = (time) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.frequency.setValueAtTime(150, time);
        osc.frequency.exponentialRampToValueAtTime(0.001, time + 0.5);

        gain.gain.setValueAtTime((state.volume / 100) * 0.4, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

        osc.start(time);
        osc.stop(time + 0.5);
    };

    const playHat = (time) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();
        
        osc.type = 'square';
        filter.type = 'highpass';
        filter.frequency.value = 8000;
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        gain.gain.setValueAtTime((state.volume / 100) * 0.05, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

        osc.start(time);
        osc.stop(time + 0.05);
    };

    const playBass = (time, freq) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        osc.type = 'sawtooth';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, time);
        filter.frequency.exponentialRampToValueAtTime(50, time + 0.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        osc.frequency.value = freq;

        gain.gain.setValueAtTime((state.volume / 100) * 0.1, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

        osc.start(time);
        osc.stop(time + 0.2);
    };

    let beatCount = 0;
    const bassSequence = [55, 55, 55, 55, 65, 65, 55, 55, 41, 41, 41, 41, 49, 49, 49, 49]; // Bassline pattern
    
    if (workoutInterval) clearInterval(workoutInterval);
    workoutInterval = setInterval(() => {
        while (nextNoteTime < audioCtx.currentTime + 0.1) {
            playKick(nextNoteTime);
            playHat(nextNoteTime + beatDuration / 2);

            const bassFreq = bassSequence[beatCount % bassSequence.length];
            playBass(nextNoteTime, bassFreq);
            playBass(nextNoteTime + beatDuration / 2, bassFreq);
            
            nextNoteTime += beatDuration;
            beatCount++;
        }
    }, 25);
};

const stopWorkoutMusic = () => {
    if (workoutInterval) clearInterval(workoutInterval);
};

const setOceanVolume = (targetVolume, transitionTime = 1, startVolume = null) => {
    if (!audioCtx) return;
    
    let tVol = (state.volume <= 0 || state.sound === 'Off') ? 0 : (state.volume / 100) * targetVolume;
    
    if (oceanGain) {
        oceanGain.gain.cancelScheduledValues(audioCtx.currentTime);
        if (startVolume !== null) {
            let sVol = (state.volume <= 0 || state.sound === 'Off') ? 0 : (state.volume / 100) * startVolume;
            oceanGain.gain.setValueAtTime(sVol, audioCtx.currentTime);
        }
        oceanGain.gain.linearRampToValueAtTime(tVol, audioCtx.currentTime + transitionTime);
    }
};

const speak = (text) => {
    if (state.preset !== 'Desk Mobility' && state.preset !== '7-Min Calisthenics') return;
    if (state.volume <= 0) return;
    if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = (state.volume / 100) * 0.45; // Gentler volume
    utterance.rate = 0.82; // Slower rate
    utterance.pitch = 0.85; // Lower pitch

    const voices = window.speechSynthesis.getVoices();
    const premiumVoices = ['Google US English', 'Google UK English Female', 'Ava', 'Samantha', 'Karen', 'Tessa'];
    let selectedVoice = null;
    for (const vName of premiumVoices) {
        selectedVoice = voices.find(v => v.name.includes(vName));
        if (selectedVoice) break;
    }

    if (selectedVoice) utterance.voice = selectedVoice;

    window.speechSynthesis.speak(utterance);
};

const beginSession = () => {
    state.sessionActive = true;
    requestWakeLock();
    DOM.landingView.classList.remove('active');
    DOM.activeSession.classList.add('active');

    window.speechSynthesis.cancel();
    window.speechSynthesis.getVoices();

    if (state.preset !== 'Desk Mobility' && state.preset !== '7-Min Calisthenics') {
        initAudio();
        if (state.preset === 'Rapid Eye Movement') {
            setOceanVolume(0.5, 2);
        } else {
            setOceanVolume(0, 0.1); // silence during warmup
        }
    }

    if (state.preset === '7-Min Calisthenics') {
        startWorkoutMusic();
    }

    let currentStageIdx = 0;
    let remainingTotal = state.stages.reduce((acc, s) => acc + s.duration, 0);
    let overallElapsed = 0;
    const grandTotal = remainingTotal;

    let phase = state.preset === 'Micro-Break' ? 'MICRO_BREAK_INTRO' : 'COUNTDOWN';
    let lastTriggeredPhase = null;
    let introRemaining = 60;
    let countdownRemaining = state.countdown;
    let phaseElapsed = 0;
    let stageElapsed = 0;

    const applyExerciseUIType = (exerciseType) => {
        let yOffset = '0px';
        if (exerciseType === 'Creative Upgaze') yOffset = '90px';
        if (exerciseType === 'Introspective Downgaze') yOffset = '-90px';

        const isStaticGaze = exerciseType.includes('Gaze') || exerciseType.includes('Eye');
        const isMobility = exerciseType === 'Desk Mobility' || exerciseType === '7-Min Calisthenics';

        if (isMobility) {
            if (DOM.mobilityFigure) {
                DOM.mobilityFigure.style.display = 'flex';
                DOM.mobilityFigure.style.opacity = '1';
            }
            DOM.breathingCircle.style.display = 'none';
            DOM.sessionTimerDisplay.style.display = 'none';
            DOM.sessionTimerDisplay.textContent = '';
            DOM.sessionInstruction.style.top = 'calc(50% + 140px)';
            DOM.eyeDot.className = 'eye-dot';
        } else {
            DOM.breathingCircle.style.display = 'block';
            DOM.sessionTimerDisplay.style.display = 'block';
            DOM.sessionTimerDisplay.textContent = '';
            DOM.sessionInstruction.style.top = 'calc(50% - 150px)';
            if (DOM.mobilityFigure) DOM.mobilityFigure.style.display = 'none';
            DOM.breathingCircle.style.transition = 'transform 1s ease';
            DOM.breathingCircle.style.transform = isStaticGaze ? `scale(1) translateY(${yOffset})` : 'scale(0.8)';
            DOM.sessionInstruction.style.top = isStaticGaze ? 'calc(50% + 160px)' : 'calc(50% + 240px)';
        }

        if (DOM.sessionContent) {
            DOM.sessionContent.style.transition = 'transform 1s ease';
            DOM.sessionContent.style.transform = `translateY(${yOffset})`;
        }

        if (exerciseType === 'Rapid Eye Movement') {
            DOM.eyeDot.className = 'eye-dot active';
            DOM.postureReminder.className = 'posture-reminder';
        } else if (exerciseType === 'Creative Upgaze') {
            DOM.eyeDot.className = 'eye-dot upgaze';
            DOM.postureReminder.textContent = 'Keep your head tilted up';
            DOM.postureReminder.className = 'posture-reminder active upgaze';
        } else if (exerciseType === 'Introspective Downgaze') {
            DOM.eyeDot.className = 'eye-dot downgaze';
            DOM.postureReminder.textContent = 'Keep your head tilted down';
            DOM.postureReminder.className = 'posture-reminder active downgaze';
        } else {
            DOM.eyeDot.className = 'eye-dot';
            DOM.postureReminder.className = 'posture-reminder';
        }

        if (exerciseType === 'Ocean Trance') {
            DOM.sessionTimerDisplay.style.display = 'none';
        }
    };

    let currentExerciseType = state.stages[0].type;
    applyExerciseUIType(currentExerciseType);

    const clearMobilityAnim = () => {
        if (!DOM.figHead) return;
        DOM.figHead.classList.remove('anim-neck');
        DOM.figGroup.classList.remove('anim-torso');
        DOM.figArmL.classList.remove('anim-reach');
        DOM.figArmR.classList.remove('anim-reach');
        DOM.figGroup.classList.remove('anim-jumping-jacks', 'anim-wall-sit', 'anim-pushups', 'anim-crunches', 'anim-step-ups', 'anim-squats', 'anim-triceps-dips', 'anim-plank', 'anim-high-knees', 'anim-lunges', 'anim-pushup-rotation', 'anim-side-plank');
    };
    clearMobilityAnim();

    const tick = () => {
        if (!state.sessionActive) return clearInterval(engineInterval);

        if (currentExerciseType === 'Desk Mobility' || currentExerciseType === '7-Min Calisthenics') {
            if (phase === 'COUNTDOWN') {
                if (countdownRemaining === state.countdown) {
                    if (currentExerciseType === '7-Min Calisthenics') speak("Let's prepare for your calisthenics workout...");
                    else speak("Let's prepare to stretch...");
                }
                DOM.sessionInstruction.textContent = `Prepare to stretch... ${countdownRemaining}s`;
                DOM.stageInfo.textContent = `Exercise 1 of ${state.stages.length}`;
                if (countdownRemaining <= 0) {
                    phase = 'ACTIVE';
                    countdownRemaining = state.countdown;
                } else {
                    if (countdownRemaining <= 3) speak(countdownRemaining + "...");
                    countdownRemaining--;
                }
            } else {
                let mobilityElapsed = overallElapsed;
                let mStage;
                let sIdx = 0;
                for (let i = 0; i < state.stages.length; i++) {
                    if (mobilityElapsed < state.stages[i].duration) {
                        mStage = state.stages[i];
                        sIdx = i;
                        break;
                    }
                    mobilityElapsed -= state.stages[i].duration;
                }

                if (!mStage) {
                    stopSession(true);
                    DOM.sessionInstruction.textContent = 'Session Complete';
                    return;
                }

                const remainingInStage = mStage.duration - mobilityElapsed;

                if (mStage.mobilityType !== 'rest' && !mStage.mobilityType.startsWith('setup-')) {
                    if (currentExerciseType === '7-Min Calisthenics') {
                        DOM.sessionInstruction.textContent = mStage.name;
                        DOM.sessionTimerDisplay.style.display = 'block';
                        DOM.sessionTimerDisplay.textContent = remainingInStage;
                        DOM.sessionTimerDisplay.style.fontSize = '4.5rem';
                        DOM.sessionInstruction.style.top = 'calc(50% - 180px)';
                        DOM.sessionTimerDisplay.style.top = 'calc(50% + 140px)';
                        if (DOM.mobilityFigure) {
                            DOM.mobilityFigure.style.display = 'flex';
                            DOM.mobilityFigure.style.opacity = '1';
                        }
                    } else {
                        DOM.sessionInstruction.textContent = `${mStage.name} — ${remainingInStage}s`;
                        DOM.sessionTimerDisplay.textContent = '';
                        DOM.sessionInstruction.style.top = 'calc(50% + 140px)';
                    }
                }
                
                // Determine exercise count for stage info
                let calisthenicsExerciseCount = 0;
                if (currentExerciseType === '7-Min Calisthenics') {
                    calisthenicsExerciseCount = state.stages.filter(s => s.mobilityType !== 'rest' && !s.mobilityType.startsWith('setup-')).length;
                    const currentExIndex = Math.floor(sIdx / 3) + 1; // setup, exercise, rest
                    DOM.stageInfo.textContent = `Exercise ${Math.min(currentExIndex, calisthenicsExerciseCount)} of ${calisthenicsExerciseCount}`;
                } else {
                    DOM.stageInfo.textContent = `Exercise ${sIdx + 1} of ${state.stages.length}`;
                }

                if (mStage.mobilityType !== lastTriggeredPhase) {
                    if (mStage.mobilityType.startsWith('setup-')) {
                        speak(`Next is ${mStage.name}. ${mStage.instruction}`);
                    } else if (currentExerciseType === '7-Min Calisthenics' && mStage.mobilityType === 'rest') {
                        speak("Rest for 20 seconds.");
                    } else {
                        speak(mStage.name + ".");
                    }
                    lastTriggeredPhase = mStage.mobilityType;
                } else if (remainingInStage <= 3 && remainingInStage > 0 && sIdx < state.stages.length - 1 && mStage.mobilityType !== 'rest' && !mStage.mobilityType.startsWith('setup-')) {
                    speak(remainingInStage + "...");
                } else if (currentExerciseType === '7-Min Calisthenics' && mStage.mobilityType !== 'rest' && !mStage.mobilityType.startsWith('setup-')) {
                    if (remainingInStage === 20) {
                        speak("You're doing great, remember to breathe smoothly.");
                    } else if (remainingInStage === 10) {
                        speak("Almost there, focus on your form and your breath.");
                    }
                }

                if (mStage.mobilityType === 'neck' && !DOM.figHead.classList.contains('anim-neck')) {
                    clearMobilityAnim();
                    DOM.figHead.classList.add('anim-neck');
                } else if (mStage.mobilityType === 'torso' && !DOM.figGroup.classList.contains('anim-torso')) {
                    clearMobilityAnim();
                    DOM.figGroup.classList.add('anim-torso');
                } else if (mStage.mobilityType === 'reach' && !DOM.figArmL.classList.contains('anim-reach')) {
                    clearMobilityAnim();
                    DOM.figArmL.classList.add('anim-reach');
                    DOM.figArmR.classList.add('anim-reach');
                } else if (currentExerciseType === '7-Min Calisthenics' && mStage.mobilityType !== 'rest' && !mStage.mobilityType.startsWith('setup-') && !DOM.figGroup.classList.contains(`anim-${mStage.mobilityType}`)) {
                    clearMobilityAnim();
                    DOM.figGroup.classList.add(`anim-${mStage.mobilityType}`);
                } else if (mStage.mobilityType === 'rest' || mStage.mobilityType.startsWith('setup-')) {
                    clearMobilityAnim();
                    DOM.sessionInstruction.style.top = 'calc(50% - 150px)';
                    if (DOM.mobilityFigure) DOM.mobilityFigure.style.opacity = '0.15';

                    if (mStage.mobilityType === 'rest') {
                        DOM.breathingCircle.style.display = 'block';
                        DOM.sessionTimerDisplay.style.display = 'block';
                        DOM.sessionTimerDisplay.style.fontSize = '4.5rem';
                        DOM.sessionTimerDisplay.style.top = '50%';
                        
                        const breathElapsed = (mStage.duration - remainingInStage) % 10;

                        if (breathElapsed < 4) {
                            DOM.sessionInstruction.textContent = 'Inhale gently';
                            DOM.sessionTimerDisplay.textContent = 4 - breathElapsed;
                        } else {
                            DOM.sessionInstruction.textContent = 'Exhale slowly';
                            DOM.sessionTimerDisplay.textContent = 10 - breathElapsed;
                        }

                        if (breathElapsed === 0) {
                            DOM.breathingCircle.style.transition = `transform 4s linear`;
                            DOM.breathingCircle.style.transform = 'scale(1.8)';
                            if (remainingInStage !== mStage.duration) {
                                speak('Inhale gently...');
                            }
                        } else if (breathElapsed === 4) {
                            DOM.breathingCircle.style.transition = `transform 6s linear`;
                            DOM.breathingCircle.style.transform = 'scale(0.8)';
                            speak('Exhale slowly...');
                        }
                    } else {
                        // Setup phase
                        DOM.breathingCircle.style.display = 'block';
                        DOM.breathingCircle.style.transition = 'transform 1s ease';
                        DOM.breathingCircle.style.transform = 'scale(1)';
                        DOM.sessionInstruction.textContent = `Next: ${mStage.name}`;
                        DOM.sessionTimerDisplay.style.display = 'block';
                        DOM.sessionTimerDisplay.style.fontSize = '4.5rem';
                        DOM.sessionTimerDisplay.style.top = '50%';
                        DOM.sessionTimerDisplay.textContent = remainingInStage;
                    }
                }

                overallElapsed++;
                if (overallElapsed >= grandTotal) {
                    stopSession(true);
                    DOM.sessionInstruction.textContent = 'Session Complete';
                    speak("Session complete. Take a moment for yourself.");
                }
            }
            DOM.sessionTotalTimer.textContent = `${formatTimeSpan(overallElapsed)} / ${formatTimeSpan(grandTotal)}`;
            return;
        }

        if (phase === 'MICRO_BREAK_INTRO') {
            const phrases = [
                "Place your hand on your chest.",
                "Think of a happy place.",
                "Be grateful for this moment.",
                "Thank yourself for taking this time.",
                "Remember: you are good.",
                "Remember: you are strong.",
                "Remember: you are enough."
            ];
            const pIdx = Math.floor((60 - introRemaining) / (60 / phrases.length));
            const currentPhrase = phrases[Math.min(pIdx, phrases.length - 1)];

            DOM.sessionInstruction.textContent = currentPhrase;
            DOM.sessionTimerDisplay.textContent = (60 - introRemaining) + 1;

            if (lastTriggeredPhase !== currentPhrase) {
                speak(currentPhrase);
                lastTriggeredPhase = currentPhrase;
            }

            if (introRemaining <= 0) {
                phase = 'COUNTDOWN';
            } else {
                introRemaining -= 1;
                return;
            }
        }

        if (phase === 'COUNTDOWN') {
            if (countdownRemaining === state.countdown) {
                if (currentExerciseType === 'Creative Upgaze') speak('Tilt your head slightly up, and get ready.');
                else if (currentExerciseType === 'Introspective Downgaze') speak('Tilt your head slightly down, and get ready.');
                else speak('Get ready.');
            }

            if (currentExerciseType === 'Creative Upgaze') {
                DOM.sessionInstruction.textContent = 'Tilt your head slightly up...';
            } else if (currentExerciseType === 'Introspective Downgaze') {
                DOM.sessionInstruction.textContent = 'Tilt your head slightly down...';
            } else {
                DOM.sessionInstruction.textContent = 'Get Ready...';
            }
            DOM.sessionTimerDisplay.textContent = (state.countdown - countdownRemaining) + 1;

            if (countdownRemaining <= 0) {
                phase = 'INHALE';
            } else {
                if (countdownRemaining <= 3) {
                    speak(countdownRemaining.toString());
                    if (currentExerciseType !== 'Desk Mobility' && currentExerciseType !== '7-Min Calisthenics') playBeep(880, 'sine', 0.2);
                }
                countdownRemaining -= 1;
                return;
            }
        }

        if (currentExerciseType === 'Rapid Eye Movement') {
            DOM.sessionInstruction.textContent = 'Follow the dot. Breathe naturally.';
            DOM.sessionTimerDisplay.textContent = '';
            DOM.sessionTotalTimer.textContent = `${formatTimeSpan(overallElapsed)} / ${formatTimeSpan(grandTotal)}`;
            DOM.stageInfo.textContent = `Bilateral Stimulation`;
            DOM.breathingCircle.style.transform = 'scale(1)';

            if (overallElapsed === 0 || (overallElapsed > 0 && stageElapsed === 0)) {
                speak('Follow the dot with your eyes. Breathe naturally.');
                if (currentExerciseType !== 'Desk Mobility' && currentExerciseType !== '7-Min Calisthenics') playBeep(440, 'sine', 0.5);
            }

            overallElapsed++;
            stageElapsed++;
            if (overallElapsed >= grandTotal || stageElapsed >= state.stages[currentStageIdx].duration) {
                if (overallElapsed >= grandTotal) {
                    stopSession(true);
                    DOM.sessionInstruction.textContent = 'Session Complete';
                    if (currentExerciseType !== 'Desk Mobility' && currentExerciseType !== '7-Min Calisthenics') playBeep(523.25, 'sine', 1.0);
                } else {
                    currentStageIdx++;
                    stageElapsed = 0;
                    phaseElapsed = 0;
                    lastTriggeredPhase = null;
                    phase = 'INHALE';
                    currentExerciseType = state.stages[currentStageIdx].type;
                    applyExerciseUIType(currentExerciseType);
                    speak(`Moving to ${currentExerciseType}`);
                }
            }
            return;
        }

        if (currentExerciseType === 'Ocean Trance') {
            DOM.sessionInstruction.textContent = 'Relax. Let the ocean waves wash over you.';
            DOM.sessionTimerDisplay.textContent = '';
            DOM.sessionTotalTimer.textContent = `${formatTimeSpan(overallElapsed)} / ${formatTimeSpan(grandTotal)}`;
            DOM.stageInfo.textContent = `Ocean Trance`;

            if (overallElapsed === 0 || (overallElapsed > 0 && stageElapsed === 0)) {
                speak('Relax. Let the ocean waves wash over you.');
            }

            if (stageElapsed % 16 === 0) {
                DOM.breathingCircle.style.transition = 'transform 8s ease-in-out';
                DOM.breathingCircle.style.transform = 'scale(1.2)';
                setOceanVolume(0.5, 8, 0.1); // Wave comes in
            } else if (stageElapsed % 16 === 8) {
                DOM.breathingCircle.style.transition = 'transform 8s ease-in-out';
                DOM.breathingCircle.style.transform = 'scale(0.8)';
                setOceanVolume(0.1, 8, 0.5); // Wave goes out
            }

            overallElapsed++;
            stageElapsed++;
            if (overallElapsed >= grandTotal || stageElapsed >= state.stages[currentStageIdx].duration) {
                if (overallElapsed >= grandTotal) {
                    stopSession(true);
                    DOM.sessionInstruction.textContent = 'Session Complete';
                    playBeep(523.25, 'sine', 1.0);
                } else {
                    currentStageIdx++;
                    stageElapsed = 0;
                    phaseElapsed = 0;
                    lastTriggeredPhase = null;
                    phase = 'INHALE';
                    currentExerciseType = state.stages[currentStageIdx].type;
                    applyExerciseUIType(currentExerciseType);
                    speak(`Moving to ${currentExerciseType}`);
                }
            }
            return;
        }

        const currentStage = state.stages[currentStageIdx];
        DOM.sessionTotalTimer.textContent = `${formatTimeSpan(overallElapsed)} / ${formatTimeSpan(grandTotal)}`;

        let subText = `In: ${currentStage.inhale}s`;
        if (currentStage.hold > 0) subText += ` • Hold: ${currentStage.hold}s`;
        subText += ` • Ex: ${currentStage.exhale}s`;
        if (currentStage.hold2 > 0) subText += ` • Pause: ${currentStage.hold2}s`;

        if (currentExerciseType === 'Creative Upgaze') {
            DOM.stageInfo.textContent = `Tilt Head Up • ${subText}`;
        } else if (currentExerciseType === 'Introspective Downgaze') {
            DOM.stageInfo.textContent = `Tilt Head Down • ${subText}`;
        } else {
            DOM.stageInfo.textContent = `Stage ${currentStageIdx + 1} (${subText})`;
        }

        if (phase === 'INHALE' && phaseElapsed >= currentStage.inhale) {
            phase = currentStage.hold > 0 ? 'HOLD' : 'EXHALE';
            phaseElapsed = 0;
        } else if (phase === 'HOLD' && phaseElapsed >= currentStage.hold) {
            phase = 'EXHALE';
            phaseElapsed = 0;
        } else if (phase === 'EXHALE' && phaseElapsed >= currentStage.exhale) {
            phase = (currentStage.hold2 && currentStage.hold2 > 0) ? 'HOLD2' : 'INHALE';
            phaseElapsed = 0;
        } else if (phase === 'HOLD2' && phaseElapsed >= currentStage.hold2) {
            phase = 'INHALE';
            phaseElapsed = 0;
        }

        if (phase !== lastTriggeredPhase) {
            if (phase === 'INHALE') {
                DOM.sessionInstruction.textContent = 'Inhale gently';
                if (!currentExerciseType.includes('Gaze') && !currentExerciseType.includes('Eye')) {
                    DOM.breathingCircle.style.transition = `transform ${currentStage.inhale}s linear`;
                    DOM.breathingCircle.style.transform = 'scale(1.8)';
                }
                speak("Inhale gently...");
                if (currentExerciseType !== 'Desk Mobility' && currentExerciseType !== '7-Min Calisthenics') {
                    playBeep(440, 'sine', 0.8);
                    if (currentExerciseType !== 'Rapid Eye Movement') setOceanVolume(0.5, currentStage.inhale, 0);
                }
            }
            else if (phase === 'HOLD' || phase === 'HOLD2') {
                DOM.sessionInstruction.textContent = 'Hold';
                if (!currentExerciseType.includes('Gaze') && !currentExerciseType.includes('Eye')) DOM.breathingCircle.style.transition = 'none';
                speak("And hold...");
                if (currentExerciseType !== 'Desk Mobility' && currentExerciseType !== '7-Min Calisthenics') {
                    playBeep(349, 'sine', 0.8);
                    if (currentExerciseType !== 'Rapid Eye Movement') setOceanVolume(0, 0.5);
                }
            }
            else if (phase === 'EXHALE') {
                DOM.sessionInstruction.textContent = 'Exhale slowly';
                if (!currentExerciseType.includes('Gaze') && !currentExerciseType.includes('Eye')) {
                    DOM.breathingCircle.style.transition = `transform ${currentStage.exhale}s linear`;
                    DOM.breathingCircle.style.transform = 'scale(0.8)';
                }
                speak("Exhale slowly...");
                if (currentExerciseType !== 'Desk Mobility' && currentExerciseType !== '7-Min Calisthenics') {
                    playBeep(261, 'sine', 0.8);
                    if (currentExerciseType !== 'Rapid Eye Movement') setOceanVolume(0, currentStage.exhale, 0.5);
                }
            }
            lastTriggeredPhase = phase;
        }

        if (phase === 'INHALE') {
            DOM.sessionTimerDisplay.textContent = Math.min(currentStage.inhale, phaseElapsed + 1);
        } else if (phase === 'HOLD') {
            DOM.sessionTimerDisplay.textContent = Math.min(currentStage.hold, phaseElapsed + 1);
        } else if (phase === 'EXHALE') {
            DOM.sessionTimerDisplay.textContent = Math.min(currentStage.exhale, phaseElapsed + 1);
        } else if (phase === 'HOLD2') {
            DOM.sessionTimerDisplay.textContent = Math.min(currentStage.hold2, phaseElapsed + 1);
        }

        phaseElapsed++;
        stageElapsed++;
        overallElapsed++;

        if (stageElapsed >= currentStage.duration) {
            currentStageIdx++;
            stageElapsed = 0;
            phaseElapsed = 0;
            lastTriggeredPhase = null;
            phase = 'INHALE';

            if (currentStageIdx >= state.stages.length) {
                stopSession(true);
                DOM.sessionInstruction.textContent = 'Session Complete';
                DOM.sessionTimerDisplay.textContent = '';
                speak("Session complete. Wonderfully done.");
                if (currentExerciseType !== 'Desk Mobility' && currentExerciseType !== '7-Min Calisthenics') playBeep(523.25, 'sine', 1.0);
            } else {
                // Compound exercise stage transition
                if (state.stages[currentStageIdx].type !== currentExerciseType) {
                    currentExerciseType = state.stages[currentStageIdx].type;
                    applyExerciseUIType(currentExerciseType);
                    speak(`Moving to ${currentExerciseType}`);
                    // Trigger countdown again for the new exercise
                    phase = 'COUNTDOWN';
                    countdownRemaining = state.countdown;
                }
            }
        }
    };

    tick();
    engineInterval = setInterval(tick, 1000);
};

const stopSession = (completed = false) => {
    state.sessionActive = false;
    releaseWakeLock();
    clearInterval(engineInterval);
    stopWorkoutMusic();
    window.speechSynthesis.cancel();
    if (state.preset !== 'Desk Mobility' && state.preset !== '7-Min Calisthenics') {
        setOceanVolume(0, 1);
    }
    DOM.breathingCircle.style.display = 'block';
    if (DOM.mobilityFigure) DOM.mobilityFigure.style.display = 'none';
    DOM.breathingCircle.style.transition = `transform 0.5s ease`;
    DOM.breathingCircle.style.transform = 'scale(1)';
    DOM.sessionTimerDisplay.textContent = '';
    if (DOM.sessionContent) {
        DOM.sessionContent.style.transform = `translateY(0px)`;
    }
    DOM.eyeDot.className = 'eye-dot';
    DOM.postureReminder.className = 'posture-reminder';
    DOM.activeSession.classList.remove('active');

    if (completed) {
        DOM.postSession.classList.add('active');
    } else {
        DOM.landingView.classList.add('active');
    }
};

DOM.stopBtn.addEventListener('click', () => stopSession(false));
DOM.earlyFinishBtn.addEventListener('click', () => stopSession(true));
