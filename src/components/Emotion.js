import React, { useCallback, useState, useRef } from 'react'
import Webcam from "react-webcam";
import axios from 'axios';
import {motion} from 'framer-motion'

const Emotion = ({setEmotionPage ,SearchHandler}) => {
    const webcamRef = useRef(null);
    const [emotion, setEmotion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const capture = useCallback(async() => {
        setLoading(true);
        const imageSrc = webcamRef.current.getScreenshot();
        await axios.post(`https://vyanjan-backend.vercel.app/api/tunein`,{
            img:imageSrc,
        }).then(async(res) => {
            const options = {
                method: 'POST',
                url: 'https://emotion-detection2.p.rapidapi.com/emotion-detection',
                headers: {
                    'content-type': 'application/json',
                    // 'X-RapidAPI-Key': 'a58726e477mshcce2e61b0cf2d3dp19f4c6jsn25da94923c41',
                    // 'X-RapidAPI-Key': '07fe85ef41msha707d181c6dfa9ep1e32a3jsne0216f14b61e',
                    'X-RapidAPI-Key': '3f794735eamsh8773e9693dca730p143f5fjsn6ddbb670fd71',
                    'X-RapidAPI-Host': 'emotion-detection2.p.rapidapi.com'
                },
                data: {
                    url: res.data.url
                }
                };
            try {
                const response = await axios.request(options);
                // console.log(response.data);
                setEmotion(response.data[0].emotion)
                setShowResult(true)
            } catch (error) {
                console.error(error);
            }
            setLoading(false)
        })

        
      }, [webcamRef]);

    return (
    <div className='w-[100vw] h-[100vh] absolute top-0 z-10 flex overflow-hidden'>
        <div className='w-[260px] h-full'></div>
        <div className='w-full bg-neutral-100'>
            <div className=' flex flex-col items-center'>
                <div className='flex '>
                    <div className='relative'>
                        <div className='bg-clip-text text-transparent text-neutral-900 text-[5rem] bg-gradient-to-b from-[#0000005d] to-[#fff0] font-bold -tracking-[2px] opacity-50 px-1'>Emotion</div>
                        <div className='absolute top-[2.8rem] text-[2.4rem] uppercase ml-5 font-[800] -right-2'>Emotion</div>
                    </div> 
                    <div className='relative'>
                        <div className='bg-clip-text text-transparent text-neutral-900 text-[5rem] bg-gradient-to-b opacity-50 from-[#0000005d] to-[#fff0] font-bold -tracking-[2px] px-1'>Recognition</div>
                        <div className='absolute ml-4 top-[2.8rem] text-[2.4rem] uppercase font-[800]'>Recognition</div>
                    </div> 
                </div>
               
                    <div className='w-full px-10'>
                        <div className='bg-neutral-200 mt-5 shadow-md flex rounded-2xl overflow-hidden'>
                            <div className='w-[720px] -scale-x-[1]'>
                                <Webcam width={720} ref={webcamRef}/>
                            </div>
                            {!showResult ? 
                            <div className='flex-1 flex flex-col items-center justify-center'>
                                <div className='text-[2.2rem] w-[20rem] text-center font-semibold text-neutral-700'>Fetched Emotion Will be Shown here</div>
                                <div className='flex space-x-8 mt-4'>
                                    <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.98}}  className='px-6 py-2 cursor-pointer bg-neutral-700 rounded-lg text-white' onClick={capture}>{loading ? 'Wait✋':'Fetch'}</motion.div>
                                    <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.98}}  className='px-6 py-2 cursor-pointer bg-neutral-700 rounded-lg text-white ' onClick={() => setEmotionPage(false)}>Close</motion.div>  
                                </div>
                            </div>
                            :
                            <div className='flex-1 flex flex-col justify-center items-center py-5 px-3 space-y-10'>
                                <div className='text-[2.2rem] capitalize flex space-x-2 flex-col items-center'>
                                    <div className='font-[2.5rem]'>Emotion Recognized</div>
                                    <div className='font-semibold'>*{emotion.value}*</div>
                                </div>

                                <div className='text-lg justify-center flex flex-wrap w-[25rem] gap-y-4 gap-x-6 '>
                                    <div className='capitalize flex cursor-pointer justify-center items-center text-center flex-col w-[7rem] hover:text-white transition-all duration-700 h-[5rem] bg-neutral-50 group rounded-xl relative overflow-hidden'>
                                        <div className='h-full group-hover:w-full transition-all duration-1000 w-[9px] absolute left-0 bg-red-500'></div>
                                        <div className='z-10'>angry😡</div> 
                                        <div className='z-10'>{Math.floor(emotion.sentiments.angry*1000)/10}%</div>
                                        </div>
                                    <div className='capitalize flex cursor-pointer justify-center items-center text-center flex-col w-[7rem] hover:text-white transition-all duration-700 h-[5rem] bg-neutral-50 group rounded-xl relative overflow-hidden'>
                                        <div className='h-full group-hover:w-full transition-all duration-1000 w-[9px] absolute left-0 bg-green-500'></div>
                                        <div className='z-10'>disgust🤢</div> 
                                        <div className='z-10'>{Math.floor(emotion.sentiments.disgust*1000)/10}%</div>
                                        </div>
                                    <div className='capitalize flex cursor-pointer justify-center items-center text-center flex-col w-[7rem] hover:text-white transition-all duration-700 h-[5rem] bg-neutral-50 group rounded-xl relative overflow-hidden'>
                                        <div className='h-full group-hover:w-full transition-all duration-1000 w-[9px] absolute left-0 bg-gray-600'></div>
                                        <div className='z-10'>fear😨</div> 
                                        <div className='z-10'>{Math.floor(emotion.sentiments.fear*1000)/10}%</div>
                                        </div>
                                    <div className='capitalize flex cursor-pointer justify-center items-center text-center flex-col w-[7rem] hover:text-white transition-all duration-700 h-[5rem] bg-neutral-50 group rounded-xl relative overflow-hidden'>
                                        <div className='h-full group-hover:w-full transition-all duration-1000 w-[9px] absolute left-0 bg-yellow-500'></div>
                                            <div className='z-10'>happy😁</div> 
                                            <div className='z-10'>{Math.floor(emotion.sentiments.happy*1000)/10}%</div>
                                        </div>
                                    <div className='capitalize flex cursor-pointer justify-center items-center text-center flex-col w-[7rem] hover:text-white transition-all duration-700 h-[5rem] bg-neutral-50 group rounded-xl relative overflow-hidden'>
                                        <div className='h-full group-hover:w-full transition-all duration-1000 w-[9px] absolute left-0 bg-black'></div>
                                            <div className='z-10'>neutral😐</div> 
                                            <div className='z-10'>{Math.floor(emotion.sentiments.neutral*1000)/10}%</div>
                                        </div>
                                    <div className='capitalize flex cursor-pointer justify-center items-center text-center flex-col w-[7rem] hover:text-white transition-all duration-700 h-[5rem] bg-neutral-50 group rounded-xl relative overflow-hidden'>
                                        <div className='h-full group-hover:w-full transition-all duration-1000 w-[9px] absolute left-0 bg-sky-400'></div>
                                            <div className='z-10'>sad😟</div> 
                                            <div className='z-10'>{Math.floor(emotion.sentiments.sad*1000)/10}%</div>
                                        </div>
                                    <div className='capitalize flex cursor-pointer justify-center items-center text-center flex-col w-[7rem] hover:text-white transition-all duration-700 h-[5rem] bg-neutral-50 group rounded-xl relative overflow-hidden'>
                                        <div className='h-full group-hover:w-full transition-all duration-1000 w-[9px] absolute left-0 bg-fuchsia-500'></div>
                                            <div className='z-10'>surprise😯</div> 
                                            <div className='z-10'>{Math.floor(emotion.sentiments.surprise*1000)/10}%</div>
                                        </div>
                                </div>
                                <div className='w-full flex justify-center space-x-5 text-white'>    
                                    <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.98}} className='w-[5rem] py-2 flex justify-center rounded-md bg-neutral-700 cursor-pointer' onClick={() => setShowResult(false)}>Retry</motion.div>
                                    <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.98}} className='w-[5.8rem] py-2 flex justify-center rounded-md bg-neutral-700 cursor-pointer' onClick={() => {
                                        SearchHandler(emotion.value)
                                        setEmotionPage(false)
                                    }}>Proceed</motion.div>
                                    <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.98}} className='w-[5rem] py-2 flex justify-center rounded-md bg-neutral-700 cursor-pointer' onClick={() => setEmotionPage(false)}>Home</motion.div>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                {/* } */}
                {/* {!showResult && 
                <div className='flex space-x-5 mt-5'>
                    <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.98}}  className='px-6 py-2 cursor-pointer bg-neutral-700 rounded-lg text-white text-sm' onClick={capture}>{loading ? 'Wait✋':'Fetch'}</motion.div>
                    <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.98}}  className='px-6 py-2 cursor-pointer bg-neutral-700 rounded-lg text-white text-sm' onClick={() => setEmotionPage(false)}>Close</motion.div>
                </div>
                } */}
            </div>
        </div>

    </div>
  )
}

export default Emotion
