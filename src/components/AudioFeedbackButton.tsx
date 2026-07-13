import React, { useState, useRef } from 'react';
import { Mic, Square, Check, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { useToast } from './ToastProvider';

export function AudioFeedbackButton({ studentId }: { studentId: string }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { addToast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        setIsProcessing(true);
        // Simulate uploading/sending process
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Cleanup stream tracks
        stream.getTracks().forEach(track => track.stop());
        
        setIsProcessing(false);
        addToast("Audio feedback sent to student.", "success");
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone", error);
      addToast("Microphone access denied. Please allow microphone permissions.", "error");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  if (isProcessing) {
    return (
      <button disabled className="bg-primary-container text-on-primary-container p-2 rounded-lg border border-primary-container transition-colors" aria-label="Processing audio">
        <Loader2 className="w-4 h-4 animate-spin" />
      </button>
    );
  }

  return (
    <button 
      onClick={isRecording ? stopRecording : startRecording}
      className={clsx(
        "p-2 rounded-lg border transition-colors",
        isRecording 
          ? "bg-error text-white border-error animate-pulse" 
          : "bg-surface-container hover:bg-surface-container-high text-on-surface border-outline-variant"
      )} 
      aria-label={isRecording ? "Stop recording" : "Record audio feedback"}
      title={isRecording ? "Stop recording" : "Record audio feedback"}
    >
      {isRecording ? <Square className="w-4 h-4 fill-current" /> : <Mic className="w-4 h-4" />}
    </button>
  );
}
