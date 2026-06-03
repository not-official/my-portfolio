"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { TYPE_INTERVAL_MS } from "../_data/portfolioData";
import type { WebAudioWindow } from "../_types/portfolioTypes";

export default function useTypewriterSound(phrases: Record<string, string>) {
  const [activeLetter, setActiveLetter] = useState("A");
  const [typedText, setTypedText] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [typingRun, setTypingRun] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const soundEnabledRef = useRef(false);

  const activePhrase = useMemo(
    () => phrases[activeLetter],
    [activeLetter, phrases]
  );

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  function getAudioContext() {
    if (typeof window === "undefined") return null;

    if (!audioContextRef.current) {
      const AudioContextClass =
        window.AudioContext || (window as WebAudioWindow).webkitAudioContext;

      if (!AudioContextClass) return null;

      audioContextRef.current = new AudioContextClass();
    }

    return audioContextRef.current;
  }

  function playTypeSound() {
    if (!soundEnabledRef.current) return;

    const audioContext = getAudioContext();

    if (!audioContext) return;

    if (audioContext.state === "suspended") {
      audioContext.resume().catch(() => {});
    }

    const now = audioContext.currentTime;

    const clickOscillator = audioContext.createOscillator();
    const clickGain = audioContext.createGain();
    const clickFilter = audioContext.createBiquadFilter();

    clickOscillator.type = "square";
    clickOscillator.frequency.setValueAtTime(1350, now);
    clickOscillator.frequency.exponentialRampToValueAtTime(720, now + 0.018);

    clickFilter.type = "bandpass";
    clickFilter.frequency.setValueAtTime(1200, now);
    clickFilter.Q.setValueAtTime(2.4, now);

    clickGain.gain.setValueAtTime(0.0001, now);
    clickGain.gain.exponentialRampToValueAtTime(0.045, now + 0.004);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.032);

    clickOscillator.connect(clickFilter);
    clickFilter.connect(clickGain);
    clickGain.connect(audioContext.destination);

    clickOscillator.start(now);
    clickOscillator.stop(now + 0.034);

    const thockOscillator = audioContext.createOscillator();
    const thockGain = audioContext.createGain();
    const thockFilter = audioContext.createBiquadFilter();

    thockOscillator.type = "triangle";
    thockOscillator.frequency.setValueAtTime(170, now);

    thockFilter.type = "lowpass";
    thockFilter.frequency.setValueAtTime(520, now);

    thockGain.gain.setValueAtTime(0.0001, now);
    thockGain.gain.exponentialRampToValueAtTime(0.018, now + 0.006);
    thockGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

    thockOscillator.connect(thockFilter);
    thockFilter.connect(thockGain);
    thockGain.connect(audioContext.destination);

    thockOscillator.start(now);
    thockOscillator.stop(now + 0.05);
  }

  function replayTyping() {
    setTypedText("");
    setTypingRun((current) => current + 1);
  }

  function toggleSound() {
    const nextValue = !soundEnabledRef.current;

    soundEnabledRef.current = nextValue;
    setSoundEnabled(nextValue);

    if (nextValue) {
      const audioContext = getAudioContext();

      if (audioContext?.state === "suspended") {
        audioContext.resume().catch(() => {});
      }

      playTypeSound();
      replayTyping();
    }
  }

  function selectLetter(letter: string) {
    setActiveLetter(letter);

    if (letter === activeLetter) {
      replayTyping();
    }
  }

  useEffect(() => {
    setTypedText("");

    let index = 0;

    const interval = window.setInterval(() => {
      setTypedText(activePhrase.slice(0, index + 1));
      playTypeSound();
      index += 1;

      if (index >= activePhrase.length) {
        window.clearInterval(interval);
      }
    }, TYPE_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [activePhrase, typingRun]);

  return {
    activeLetter,
    activePhrase,
    typedText,
    soundEnabled,
    typingRun,
    selectLetter,
    toggleSound,
  };
}