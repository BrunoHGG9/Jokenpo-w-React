import React, { useState, useEffect } from "react";
import "./Jokenpo.css";

function Game() {
    const [escUser, setUser] = useState(null);
    const [escBot, setBot] = useState(null);
    const [win, setWin] = useState("");
    const [gameOver, setGameOver] = useState(false);

    const choices = ["Pedra", "Papel", "Tesoura"];

    const playgame = (choice) => {
        if (gameOver) return;
        
        setUser(choice);
        const randomChoice = choices[Math.floor(Math.random() * choices.length)];
        setBot(randomChoice);
    };

    const resetGame = () => {
        setUser(null);
        setBot(null);
        setWin("");
        setGameOver(false);
    };

    useEffect(() => {
        if (escUser && escBot) {
            if (escUser === escBot) {
                setWin("Empate");
                setGameOver(false);
            } else if (
                (escUser === "Pedra" && escBot === "Tesoura") ||
                (escUser === "Papel" && escBot === "Pedra") ||
                (escUser === "Tesoura" && escBot === "Papel")
            ) {
                setWin("Vitória do Usuário");
                setGameOver(false);

            } else {
                setWin("Vitória do Bot");
                setGameOver(true);
            }
        }
    }, [escUser, escBot]);

    return (
        <div className="jokenpo-container">
            <h1>Jokenpô</h1>

            <div className="choices">
                <button
                    className="choice-btn"
                    onClick={() => playgame("Pedra")}
                    disabled={gameOver}
                >
                    Pedra
                </button>
                <button
                    className="choice-btn"
                    onClick={() => playgame("Papel")}
                    disabled={gameOver}
                >
                    Papel
                </button>
                <button
                    className="choice-btn"
                    onClick={() => playgame("Tesoura")}
                    disabled={gameOver}
                >
                    Tesoura
                </button>
            </div>

            <div className="results">
                <p>Sua escolha: <span id="user-choice">{escUser}</span></p>
                <p>Escolha do computador: <span id="computer-choice">{escBot}</span></p>
                <p>Resultado: <span id="result">{win}</span></p>
            </div>

            {gameOver && (
                <button className="reset-btn" onClick={resetGame}>
                    Jogar Novamente
                </button>
            )}
        </div>
    );
}

export default Game;
