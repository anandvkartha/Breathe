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
    ]
};

const state = {
    preset: 'Micro-Break',
    sound: 'Ocean',
    volume: 25,
    countdown: 8,
    stages: Array.from(PRESETS['Micro-Break'].map(s => ({ ...s }))),
    sessionActive: false,
};

// DOM Elements
const DOM = {
    landingView: document.getElementById('landing-view'),
    tabMoodToggle: document.getElementById('tab-mood-toggle'),
    tabPresetsToggle: document.getElementById('tab-presets-toggle'),
    tabMood: document.getElementById('tab-mood'),
    tabPresets: document.getElementById('tab-presets'),
    postSession: document.getElementById('post-session'),
    postBetterBtn: document.getElementById('post-better-btn'),
    postSameBtn: document.getElementById('post-same-btn'),
    earlyFinishBtn: document.getElementById('early-finish-btn'),
    activeSession: document.getElementById('active-session'),
    stopBtn: document.getElementById('stop-session-btn'),
    presetControls: document.getElementById('preset-controls'),
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
// UI Renderers & Bindings
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

setupChipGroup(DOM.presetControls, state.preset, (val) => {
    state.preset = val;
    state.stages = Array.from(PRESETS[val].map(s => ({ ...s })));
    const remInfo = document.getElementById('rem-info');
    const upgazeInfo = document.getElementById('upgaze-info');
    const downgazeInfo = document.getElementById('downgaze-info');

    if (remInfo) remInfo.style.display = val === 'Rapid Eye Movement' ? 'block' : 'none';
    if (upgazeInfo) upgazeInfo.style.display = val === 'Creative Upgaze' ? 'block' : 'none';
    if (downgazeInfo) downgazeInfo.style.display = val === 'Introspective Downgaze' ? 'block' : 'none';
});
setupChipGroup(DOM.volumeControls, state.volume === 0 ? 'Off' : state.volume.toString(), (val) => {
    state.volume = val === 'Off' ? 0 : parseInt(val);
});

// Tab Switching Logic
if (DOM.tabMoodToggle && DOM.tabPresetsToggle) {
    DOM.tabMoodToggle.addEventListener('click', () => {
        DOM.tabMoodToggle.classList.add('active');
        DOM.tabPresetsToggle.classList.remove('active');
        DOM.tabMood.classList.add('active');
        DOM.tabPresets.classList.remove('active');
    });

    DOM.tabPresetsToggle.addEventListener('click', () => {
        DOM.tabPresetsToggle.classList.add('active');
        DOM.tabMoodToggle.classList.remove('active');
        DOM.tabPresets.classList.add('active');
        DOM.tabMood.classList.remove('active');
    });
}

// Mood Selector Routing
document.querySelectorAll('#tab-mood .mood-card').forEach(card => {
    card.addEventListener('click', (e) => {
        const selectedPreset = card.dataset.preset;
        const presetButton = Array.from(DOM.presetControls.querySelectorAll('.chip, .mood-card'))
            .find(b => b.dataset.preset === selectedPreset || b.textContent.trim() === selectedPreset);
        if (presetButton) presetButton.click();
        else {
            state.preset = selectedPreset;
            state.stages = Array.from(PRESETS[state.preset].map(s => ({ ...s })));
            
            document.querySelectorAll('#tab-mood .mood-card').forEach(c => {
                c.classList.toggle('active', c.dataset.preset === state.preset);
            });
        }

        if (e.target.closest('.play-arrow') && typeof beginSession === 'function') {
            DOM.landingView.classList.remove('active');
            beginSession();
        }
    });

    card.addEventListener('dblclick', () => {
        const selectedPreset = card.dataset.preset;
        const presetButton = Array.from(DOM.presetControls.querySelectorAll('.chip, .mood-card'))
            .find(b => b.dataset.preset === selectedPreset || b.textContent.trim() === selectedPreset);
        if (presetButton) presetButton.click();
        else {
            state.preset = selectedPreset;
            state.stages = Array.from(PRESETS[state.preset].map(s => ({ ...s })));
        }
        
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
        
        if (!clickedCard && !clickedPresetChip && !clickedVolumeChip && !clickedTab) {
            document.querySelectorAll('#tab-mood .mood-card, #preset-controls .chip, #preset-controls .mood-card').forEach(c => {
                c.classList.remove('active');
                c.classList.remove('active-blue');
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
    if (state.preset !== 'Desk Mobility') return;
    if (state.volume <= 0) return;
    if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = (state.volume / 100) * 0.65; // Dropped master volume for ASMR whisper feel
    utterance.rate = 0.85; // Slightly slower than default
    utterance.pitch = 0.95; // Extremely mild drop to reduce intensity without distortion

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
    DOM.landingView.classList.remove('active');
    DOM.activeSession.classList.add('active');

    window.speechSynthesis.cancel();
    window.speechSynthesis.getVoices();

    if (state.preset !== 'Desk Mobility') {
        initAudio();
        if (state.preset === 'Rapid Eye Movement') {
            setOceanVolume(0.5, 2);
        } else {
            setOceanVolume(0, 0.1); // silence during warmup
        }
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
        const isMobility = exerciseType === 'Desk Mobility';

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
    };
    clearMobilityAnim();

    const tick = () => {
        if (!state.sessionActive) return clearInterval(engineInterval);

        if (currentExerciseType === 'Desk Mobility') {
            if (phase === 'COUNTDOWN') {
                if (countdownRemaining === state.countdown) speak("Let's prepare to stretch...");
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

                if (mStage.mobilityType !== 'rest') {
                    DOM.sessionInstruction.textContent = `${mStage.name} — ${remainingInStage}s`;
                    DOM.sessionTimerDisplay.textContent = '';
                }
                DOM.stageInfo.textContent = `Exercise ${sIdx + 1} of ${state.stages.length}`;

                if (mStage.mobilityType !== lastTriggeredPhase) {
                    speak(mStage.name + ".");
                    lastTriggeredPhase = mStage.mobilityType;
                } else if (remainingInStage <= 3 && remainingInStage > 0 && sIdx < state.stages.length - 1 && mStage.mobilityType !== 'rest') {
                    speak(remainingInStage + "...");
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
                } else if (mStage.mobilityType === 'rest') {
                    clearMobilityAnim();
                    DOM.breathingCircle.style.display = 'block';
                    DOM.sessionTimerDisplay.style.display = 'block';
                    DOM.sessionInstruction.style.top = 'calc(50% - 150px)';
                    if (DOM.mobilityFigure) DOM.mobilityFigure.style.opacity = '0.15';

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
                    if (currentExerciseType !== 'Desk Mobility') playBeep(880, 'sine', 0.2);
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
                if (currentExerciseType !== 'Desk Mobility') playBeep(440, 'sine', 0.5);
            }

            overallElapsed++;
            stageElapsed++;
            if (overallElapsed >= grandTotal || stageElapsed >= state.stages[currentStageIdx].duration) {
                if (overallElapsed >= grandTotal) {
                    stopSession(true);
                    DOM.sessionInstruction.textContent = 'Session Complete';
                    if (currentExerciseType !== 'Desk Mobility') playBeep(523.25, 'sine', 1.0);
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
                if (currentExerciseType !== 'Desk Mobility') {
                    playBeep(440, 'sine', 0.8);
                    if (currentExerciseType !== 'Rapid Eye Movement') setOceanVolume(0.5, currentStage.inhale, 0);
                }
            }
            else if (phase === 'HOLD' || phase === 'HOLD2') {
                DOM.sessionInstruction.textContent = 'Hold';
                if (!currentExerciseType.includes('Gaze') && !currentExerciseType.includes('Eye')) DOM.breathingCircle.style.transition = 'none';
                speak("And hold...");
                if (currentExerciseType !== 'Desk Mobility') {
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
                if (currentExerciseType !== 'Desk Mobility') {
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
                if (currentExerciseType !== 'Desk Mobility') playBeep(523.25, 'sine', 1.0);
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
    clearInterval(engineInterval);
    window.speechSynthesis.cancel();
    if (state.preset !== 'Desk Mobility') {
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
