"use client"

import { AudioLines, Disc2, Mic } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import StartButton from './buttons/start'
import StopButton from './buttons/stop'
import { useIsBrowser } from '@/lib/useIsBrowser'

const BottomSheet = () => {
    const isBrowser = useIsBrowser()
    
    const [transcribing, setTranscribing] = useState(false)
    const [listening, setListening] = useState(false)

    const [file, setFile] = useState<File | null>(null)
    const [audioUrl, setAudioUrl] = useState<string | null>(null)
    const [transcription, setTranscription] = useState<string | null>("")
    const [isLoading, setIsLoading] = useState(false)
    const [recording, setRecording] = useState(false)
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)
    const [isSpeechSupported, setIsSpeechSupported] = useState(false)
    const formData = new FormData()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const recognitionRef = useRef<any>(null)

    useEffect(() => {
      if (isBrowser){
        const speechSupported = "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
        setIsSpeechSupported(speechSupported)
      }
    }, [isBrowser])
    useEffect(() => {
      if (!isBrowser) return;
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

      if (SpeechRecognition){
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        let finalTranscript = "";
        recognition.onresult = (event: any) => {
          let interimTranscript = ""
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal){
              finalTranscript +=  transcript + " ";
            } else {
              interimTranscript += transcript;
            }
          }
          setTranscription(finalTranscript + interimTranscript);
          console.log("Transcription ", transcription)

        };
        recognition.onerror = (event: any) => {
          console.error("Speech Recognition Error: ", event.error)
          setRecording(false)
        }
        recognitionRef.current = recognition
      }
      return () => {
        if (recognitionRef.current){
          recognitionRef.current.stop();
        }
        if (mediaStream) {
          mediaStream.getTracks().forEach((track) => track.stop());
        }
      }
    }, [isBrowser])

    const handleStartRecording = async () => {
      if (recognitionRef.current && !recording) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          })
          setMediaStream(stream)
          setListening(true)
          recognitionRef.current.start()
          setRecording(true)
          setTranscription("")
        } catch (error) {
          console.error("Error accessing Microphone: ", error)
        }
      }
    }

    const handleStopRecording = async () => {
      if (recognitionRef.current && recording){
        recognitionRef.current.stop()
        setRecording(false)
        if (mediaStream) {
          mediaStream.getTracks().forEach((track) => track.stop());
          setMediaStream(null)
        }
        setListening(false)
      }
      console.log("Transcription: ", transcription)
    }

  return (
    <div className='w-[700px] py-[26px] flex items-center justify-between flex-col bg-white rounded-2xl gap-5'>
        <div className='flex flex-col justify-between items-center gap-4'>
            <div className='bg-gray-300 flex items-center justify-center p-5 rounded-full'>
            {transcribing ? <AudioLines /> : <Disc2 />}
            
            </div>
            <h1 className='font-semibold w-[214px] text-center'>Transcribing and detecting Bible Quotations in real time</h1>
        </div>
        {listening ? <StopButton onClick={handleStopRecording} /> : <StartButton onClick={handleStartRecording}/>}
    </div>
  )
}

export default BottomSheet