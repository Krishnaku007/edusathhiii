"use client";

import { useRef, useState } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoiceControlsProps {
  onTranscript: (text: string) => void;
  textToRead?: string;
}

export function VoiceControls({ onTranscript, textToRead }: VoiceControlsProps) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<{ stop: () => void } | null>(null);

  const startListening = () => {
    const speechWindow = window as Window & {
      SpeechRecognition?: new () => {
        lang: string;
        interimResults: boolean;
        onresult: (event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void;
        onend: () => void;
        start: () => void;
        stop: () => void;
      };
      webkitSpeechRecognition?: new () => {
        lang: string;
        interimResults: boolean;
        onresult: (event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void;
        onend: () => void;
        start: () => void;
        stop: () => void;
      };
    };

    const SpeechRecognitionCtor = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) {
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      onTranscript(event.results[0][0].transcript);
    };

    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const speak = () => {
    if (!textToRead || typeof window === "undefined") {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = "en-IN";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={listening ? stopListening : startListening} variant={listening ? "destructive" : "default"}>
        {listening ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
        {listening ? "Stop Mic" : "Start Mic"}
      </Button>
      <Button onClick={speak} variant="secondary">
        <Volume2 className="mr-2 h-4 w-4" />
        Read Aloud
      </Button>
    </div>
  );
}
