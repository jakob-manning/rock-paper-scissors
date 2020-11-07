import React from 'react'
import rock from "./images/rock.jpg"
import paper from "./images/paper.png"
import scissors from "./images/scissors.png"
import styling from "./RPS.css"
import questionMark from "./images/questionMark3.png"
import tie from "./images/tie.png"
import fightRock from "./images/fightRock.png"
import fightPaper from "./images/fightPaper.png"
import fightScissors from "./images/fightScissors.png"

const humanNouns = ["Team human", "The player", "You - you got lucky", "Rebel scum", "The 'living' player", "A philosophical zombie", "Team humans - good for you", "The Player - proud of yourself?", "Homo Genus wins this time", "You - satisfied?", "You - you got lucky", "You - you got lucky", "You - you got lucky", "You - satisfied?", "The player", "The player", "The player", "The player", "The player", "The player"]

const reducer = (accumulator, currentValue) => accumulator + currentValue;

class RPS extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            recentWinner: '',
            recentWinnerNoun:'',
            player1History: '',
            player2History: '',
            player1Score: [0],
            player2Score: [0],
            p1ChoiceNoun: '',
            p2ChoiceNoun: '',
            imageRock: rock,
            imagePaper: paper,
            imageScissors: scissors,
            drawImage: tie,
            p1Image: questionMark,
            p2Image: questionMark,
            winnerImage: questionMark,
            fightingRock: fightRock,
            fightingPaper: fightPaper,
            fightingScissors: fightScissors

        }
    }

    calculateWinner = (choice1, choice2) => {
        if(choice1 === choice2){
            return 0
        }

        if (choice1 > choice2){
            if((choice1 - choice2) === 2){
                return 2
            }
            return 1
        }
        if((choice2 - choice1) ===2){
            return 1
        }
        return 2
    }

    updateOutcomes = (winner) => {
        let p1Record = this.state.player1History
        let p2Record = this.state.player2History

        let p1Score = this.state.player1Score
        let p2Score = this.state.player2Score

        if (winner === 0){
            p1Score.push(1)
            p2Score.push(1)
            this.setState({
                player1History: p1Record + " draw",
                player2History: p2Record + " draw",
                player1Score: p1Score,
                player2Score: p2Score,
                recentWinner: winner,
                recentWinnerNoun: "Draw",
            })
        }
        else if( winner === 1){
            let humanNoun = humanNouns[Math.floor((Math.random()*20))]
            p1Score.push(2)
            p2Score.push(0)
            this.setState({
                player1History: p1Record + " win",
                player2History: p2Record + " loss",
                player1Score: p1Score,
                player2Score: p2Score,
                recentWinner: winner,
                recentWinnerNoun: humanNoun
            })
        }
        else {
            p1Score.push(0)
            p2Score.push(2)
            this.setState({
                player1History: p1Record + " loss",
                player2History: p2Record + " win",
                player1Score: p1Score,
                player2Score: p2Score,
                recentWinner: winner,
                recentWinnerNoun: "The Computer",
            })
        }
    }

    simulateHandler = () => {
        let choice1 = Math.floor((Math.random()*3)+1)
        console.log(choice1)
        let choice2 = Math.floor((Math.random()*3)+1)
        console.log(choice2)

        let winner = this.calculateWinner(choice1, choice2)
        console.log("winner is:" + winner)
        this.updateOutcomes(winner)

    }

    translate = (choice) => {
        if(choice === 1){
            return "Rock"
        }
        if(choice === 2){
            return "Paper"
        }
        return "Scissors"
    }

    assignImage = (choice) =>{
        if(choice === 1){
            return this.state.fightingRock
        }
        if(choice === 2){
            return this.state.fightingPaper
        }
        return this.state.fightingScissors
    }

    assignWinnerImage = (winner, choice1, choice2) => {
        let winningChoice = choice2
        if(winner === 0){
            this.setState({
                winnerImage: this.state.drawImage
            })
            return;
        }
        if(winner === 1){
            winningChoice = choice1
        }

        if(winningChoice === 1){
            this.setState({
                winnerImage: this.state.imageRock
            })
            return
        }
        else if(winningChoice === 2){
            this.setState({
                winnerImage: this.state.imagePaper
            })
            return
        }
        else {
            this.setState({
                winnerImage: this.state.imageScissors
            })
        }
    }

    playHandler = (playerChoice) => {
        console.log("player choice was:" + playerChoice)
        let choice1 = playerChoice
        let choice2 = Math.floor((Math.random()*3)+1)
        console.log("computer's choice was:" + choice2)

        //update match up
        let p1choice = this.translate(choice1)
        let p2choice = this.translate(choice2)
        let p1NewImage = this.assignImage(choice1)
        let p2NewImage = this.assignImage(choice2)
        this.setState({
            p1ChoiceNoun: p1choice,
            p2ChoiceNoun: p2choice,
            p1Image: p1NewImage,
            p2Image: p2NewImage
        })

        //calculate winner of the chicken dinner
        let winner = this.calculateWinner(choice1, choice2)
        console.log("winner is:" + winner)

        //update winner image
        this.assignWinnerImage(winner, choice1, choice2)

        //update state accordingly
        this.updateOutcomes(winner)
    }

    resetHandler = () => {
        this.setState({
            recentWinner: '',
            recentWinnerNoun:'',
            player1History: '',
            player2History: '',
            player1Score: [0],
            player2Score: [0],
            p1ChoiceNoun: '',
            p2ChoiceNoun: '',
            imageRock: rock,
            imagePaper: paper,
            imageScissors: scissors,
            drawImage: tie,
            p1Image: questionMark,
            p2Image: questionMark,
            winnerImage: questionMark,
            fightingRock: fightRock,
            fightingPaper: fightPaper,
            fightingScissors: fightScissors
        })
    }

    //add images for each selection
    //create a score board (not just a list)
    //best of 5

    render() {
        return (
        <div className={"rpsWrapper"}>
            <h2>Rock Paper Scissors</h2>
            <div className={"buttonContainer"}>
                <div className={"choiceDiv"} onClick={this.playHandler.bind(this,1)}><img className={"choiceImage choiceImageButton"} src={rock} alt={"Rock"}/>ROCK</div>
                <div className={"choiceDiv"} onClick={this.playHandler.bind(this,2)}><img className={"choiceImage choiceImageButton"} src={paper} alt={"Paper"}/>PAPER</div>
                <div className={"choiceDiv"} onClick={this.playHandler.bind(this,3)}><img className={"choiceImage choiceImageButton"} src={scissors} alt={"Scissors"}/>SCISSORS</div>
            </div>
            <div className={"buttonContainer"}>
                <div className={"faceOff"}><img className={"choiceImage"} src={this.state.p1Image} alt={"Player Choice"}/></div>
                <div className={"faceOff"}>VS</div>
                <div className={"faceOff"}><img className={"choiceImage"} src={this.state.p2Image} alt={"Computer Choice"}/></div>
            </div>
            <div className={"buttonContainer lessPadding"}>
                <div className={"faceOff"}>Winner Is:</div>
                <div className={"faceOff"}><img className={"choiceImage"} src={this.state.winnerImage} alt={"Winner"}/></div>
            </div>
            <div className={"buttonContainer lessPadding"}>
                <div className={"faceOff"}>Player Score: {this.state.player1Score.reduce(reducer)}</div>
                <div className={"faceOff"}>Computer Score:  {this.state.player2Score.reduce(reducer)}</div>
            </div>
            <div className={"buttonContainer lessPadding"}>
                <div onClick={this.resetHandler} className={"resetButton"}>Try Again?</div>
                <p className={"easterEgg"}>🥚🥚🐰🐰 Look at you finding this!</p>
            </div>
        </div>
        )
    }
}

export default RPS
