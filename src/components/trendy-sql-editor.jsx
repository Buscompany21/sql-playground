"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import CodeMirror from '@uiw/react-codemirror'
import { sql } from '@codemirror/lang-sql'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import {
  Wand2,
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import confetti from 'canvas-confetti'

const levels = [
  { 
    title: "Level 1: Select All Spells", 
    task: "Can you select all the spells from our magic book?",
    initialCode: "SELECT * FROM spells;",
    expectedOutput: JSON.stringify([
      { id: 1, name: "Lumos", effect: "Creates light" },
      { id: 2, name: "Alohomora", effect: "Unlocks doors" },
      { id: 3, name: "Wingardium Leviosa", effect: "Levitates objects" }
    ], null, 2)
  },
  { 
    title: "Level 2: Find Specific Creatures", 
    task: "Can you find all magical creatures that can fly?",
    initialCode: "SELECT * FROM magical_creatures WHERE can_fly = true;",
    expectedOutput: JSON.stringify([
      { id: 1, name: "Dragon", type: "Reptile", can_fly: true },
      { id: 3, name: "Phoenix", type: "Bird", can_fly: true }
    ], null, 2)
  },
  { 
    title: "Level 3: Count Potions", 
    task: "How many potions do we have in our inventory?",
    initialCode: "SELECT COUNT(*) AS potion_count FROM potions;",
    expectedOutput: JSON.stringify([
      { potion_count: 15 }
    ], null, 2)
  }
]

export function TrendySqlEditor() {
  const [sqlCode, setSqlCode] = useState(levels[0].initialCode)
  const [output, setOutput] = useState("")
  const [serverMessage, setServerMessage] = useState("")
  const [currentLevel, setCurrentLevel] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isMessageExpanded, setIsMessageExpanded] = useState(true)
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false)
  const messageRef = useRef(null)

  useEffect(() => {
    setSqlCode(levels[currentLevel].initialCode)
    setOutput("")
    setServerMessage(`Welcome to ${levels[currentLevel].title}! ${levels[currentLevel].task}`)
    setProgress((currentLevel / (levels.length - 1)) * 100)
    setIsMessageExpanded(true)
    setTimeout(() => setIsMessageExpanded(false), 5000) // Auto-collapse after 5 seconds
  }, [currentLevel])

  const handleExecute = async () => {
    setServerMessage("Casting your SQL spell... 🧙‍♀️✨")
    setIsMessageExpanded(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setOutput(levels[currentLevel].expectedOutput)
      setServerMessage(
        "OMG, you did it! 🎉 Your SQL spell was totally perfect! Let's break it down:\n\n1. You used SELECT, which is like using your wand to point at the exact info you want.\n2. The * is like saying 'Accio everything!' - it grabs all the columns.\n3. FROM spells tells the database which magical book to look in.\n\nNow, try tweaking your spell to get specific stuff. Like, can you just get the 'name' and 'effect' of the spells? Remember, in SQL, being precise is key - just like getting your eyeliner perfect! 💖"
      )
      setIsCelebrationOpen(true)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    } catch (error) {
      setServerMessage(
        "Oops! Your spell kinda fizzled: " + error.message + " But don't stress! Every amazing witch makes mistakes. Let's troubleshoot:\n\n1. Double-check your spelling: SQL words like SELECT, FROM, WHERE need to be just right.\n2. Look at your punctuation: Are your quotes and semicolons in the right spots?\n3. Check your table names: Is 'spells' really the name of our magical table?\n\nTake a sec, look over your spell, and give it another shot. You've got this! 💪✨"
      )
    }
  }

  const handleNavigation = (direction) => {
    if (direction === 'back' && currentLevel > 0) {
      setCurrentLevel(currentLevel - 1)
    } else if (direction === 'next' && currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1)
    }
  }

  const toggleMessageBox = () => {
    setIsMessageExpanded(prev => !prev)
  }

  return (
    (<div
      className="flex flex-col h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-4 space-y-4">
      <Card
        className="flex-1 border-4 border-pink-200 shadow-lg overflow-hidden bg-white bg-opacity-80 backdrop-blur-sm">
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-purple-600 flex items-center">
              <Sparkles className="mr-2 text-pink-500" />
              Magical SQL Spellbook
            </h2>
            <span className="text-lg font-semibold text-indigo-600">{levels[currentLevel].title}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden">
            <div className="flex flex-col">
              <div className="flex-grow overflow-hidden rounded-lg shadow-inner">
                <CodeMirror
                  value={sqlCode}
                  height="100%"
                  theme={vscodeDark}
                  extensions={[sql()]}
                  onChange={(value) => setSqlCode(value)}
                  className="h-full overflow-auto rounded-lg" />
              </div>
              <Button
                className="mt-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-200 w-full overflow-hidden hover:shadow-xl"
                onClick={handleExecute}>
                Cast Your Spell! 🧙‍♀️✨
              </Button>
              <div
                className={`mt-2 bg-purple-100 rounded-lg border-2 border-purple-200 overflow-hidden transition-all duration-300 ease-in-out ${
                  isMessageExpanded ? 'max-h-[300px]' : 'max-h-12'
                }`}>
                <div className="p-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2 text-purple-600" />
                      <span className="font-semibold text-purple-600">Enchanted Message:</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleMessageBox}
                      className="p-1 hover:bg-purple-200 text-purple-600"
                      aria-label={isMessageExpanded ? "Collapse message" : "Expand message"}>
                      {isMessageExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </div>
                  <div
                    ref={messageRef}
                    className={`overflow-auto transition-all duration-300 ease-in-out ${isMessageExpanded ? 'max-h-[250px]' : 'max-h-0'}`}>
                    <p className="text-sm text-purple-800 whitespace-pre-line">{serverMessage}</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bg-pink-50 rounded-lg p-4 overflow-auto border-2 border-pink-200 shadow-inner">
              <h3 className="text-lg font-semibold text-purple-600 mb-2 flex items-center">
                <Wand2 className="mr-2 text-pink-500" />
                Magical Results ✨
              </h3>
              <pre className="text-sm whitespace-pre-wrap text-indigo-800">{output}</pre>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card
        className="w-full p-4 bg-white bg-opacity-80 backdrop-blur-sm border-4 border-indigo-200 shadow-lg">
        <div className="flex justify-between items-center">
          <Button
            onClick={() => handleNavigation('back')}
            disabled={currentLevel === 0}
            className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transform transition duration-200 hover:scale-105 text-sm">
            <ArrowLeft className="mr-1 h-4 w-4" /> Previous
          </Button>
          <Progress
            value={progress}
            className="w-1/3 h-2 bg-pink-200"
            indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500" />
          <Button
            onClick={() => handleNavigation('next')}
            disabled={currentLevel === levels.length - 1}
            className="bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transform transition duration-200 hover:scale-105 text-sm">
            Next <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </Card>
      <Dialog open={isCelebrationOpen} onOpenChange={setIsCelebrationOpen}>
        <DialogContent
          className="bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 border-4 border-purple-300">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-purple-700">Magical Success! 🎉✨</DialogTitle>
            <DialogDescription className="text-lg text-purple-600">
              You've cast the perfect SQL spell! Your magical coding skills are truly enchanting!
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 text-center">
            <p className="text-purple-700 mb-4">Ready to tackle the next magical challenge?</p>
            <Button
              onClick={() => setIsCelebrationOpen(false)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-200">
              Continue Spellcasting
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>)
  );
}