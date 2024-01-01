// VirtualAssistantChatBot.js
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import TypingAnimation from '../components/TypingAnimation'
import {RiRobot2Line} from 'react-icons/ri'

const RecommendedQuestions = ({onQuestionClick}) => {
  const recommendedQuestions = ['What is your service?', 'How can I contact support?', 'Tell me about your pricing']

  return (
    <div className="flex space-x-2 mt-2">
      {recommendedQuestions.map((question, index) => (
        <button
          key={index}
          className="bg-gray-700 text-white px-4 ml-8 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-900"
          onClick={() => onQuestionClick(question)}>
          {question}
        </button>
      ))}
    </div>
  )
}

const VirtualAssistantChat = () => {
  const [inputValue, setInputValue] = useState('')
  const [chatLog, setChatLog] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  console.log({chat: chatLog})

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    setChatLog((prevChatLog) => [...prevChatLog, {type: 'user', message: inputValue}])
    sendMessage(inputValue)
    setInputValue('')
    // setIsSubmitting(false)
  }

  const handleQuestionClick = (question) => {
    sendMessage(question)
    setChatLog((prevChatLog) => [...prevChatLog, {type: 'user', message: question}])
  }

  useEffect(() => {
    console.log('Fetching chat history...')
    fetchChatHistory()
  }, [])
  useEffect(() => {
    console.log('Updated chatLog state:', chatLog)
  }, [chatLog])

  const fetchChatHistory = async () => {
    try {
      const historyUrl = 'http://localhost:5000/api/history'
      const response = await axios.get(historyUrl)
      console.log('Chat history response:', response.data)
      setChatLog(response.data)
    } catch (error) {
      console.error('Error fetching chat history:', error)
    }
  }

  const saveMessageToDatabase = (message, type) => {
    const saveUrl = 'http://localhost:5000/api/save-message'
    axios
      .post(saveUrl, {message, type})
      .then((response) => {
        console.log('Message saved to database:', response.data)
      })
      .catch((error) => {
        console.error('Error saving message to database:', error)
      })
  }

  const sendMessage = (content) => {
    const url = 'https://api.openai.com/v1/chat/completions'
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_PUBLIC_OPENAI_KEY}`,
    }

    const data = {
      model: 'gpt-3.5-turbo',
      messages: [{role: 'user', content: content}],
    }

    setIsLoading(true)

    axios
      .post(url, data, {headers: headers})
      .then((response) => {
        console.log(response)
        const botResponse = response.data.choices[0].message.content

        // Simpan pesan pengguna dan jawaban bot ke database
        saveMessageToDatabase(content, 'user')
        saveMessageToDatabase(botResponse, 'bot')
        setChatLog((prevChatLog) => [...prevChatLog, {type: 'bot', message: botResponse}])
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
      })
  }

  return (
    <div className="container mx-auto max-w-[700px]">
      <div className="flex flex-col h-screen bg-gray-900">
        <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center py-3 font-bold text-6xl">Telkom</h1>
        <div className="flex-grow p-6  overflow-scroll ">
          <div className="flex flex-col space-y-4">
            {chatLog.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`${message.type === 'user' ? 'bg-purple-500' : 'bg-gray-800'} rounded-lg p-4 text-white max-w-sm flex`}>
                  {message.type === 'bot' && (
                    <span className="font-bold ">
                      <RiRobot2Line className="h-8 w-8" />
                    </span>
                  )}
                  <div className={`${message.type === 'user' ? 'bg-purple-500' : 'bg-gray-800'} rounded-lg pl-2 text-white max-w-sm ml-2`}>
                    {message.message}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div key={chatLog.length} className="flex justify-start">
                <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                  <TypingAnimation />
                </div>
              </div>
            )}
          </div>
        </div>
        <RecommendedQuestions onQuestionClick={handleQuestionClick} />
        <form className="flex-none p-6">
          <div className="flex rounded-lg border border-gray-700 bg-gray-800">
            <input
              type="text"
              className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default VirtualAssistantChat
