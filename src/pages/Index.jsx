import React, { useState, useEffect } from "react";
import "./Jokenpo.css";

function Game() {
    const [escUser, setUser] = useState(null);
    const [escBot, setBot] = useState(null);
    const [win, setWin] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [userWins, setUserWins] = useState(0);
    const [draws, setDraws] = useState(0);
    const [botWins, setBotWins] = useState(0);

    const choices = ["Pedra", "Papel", "Tesoura"];

    const playgame = (choice) => {
        if (gameOver) return;  // Não permite jogar se o jogo está terminado
        
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
                setDraws(prevDraws => prevDraws + 1);
                setGameOver(false);  // Permite jogar novamente após empate
            } else if (
                (escUser === "Pedra" && escBot === "Tesoura") ||
                (escUser === "Papel" && escBot === "Pedra") ||
                (escUser === "Tesoura" && escBot === "Papel")
            ) {
                setWin("Vitória do Usuário");
                setUserWins(prevWins => prevWins + 1);
                setGameOver(false);  // Permite jogar novamente após vitória
            } else {
                setWin("Vitória do Bot");
                setBotWins(prevWins => prevWins + 1);
                setGameOver(true);   // Desativa botões e mostra o botão de reset após derrota
            }
        }
    }, [escUser, escBot]);

    return (
        <div>
            <div className="card score-card">
                <p>Vitórias do Usuário: <span id="user-wins">{userWins}</span></p>
                <p>Empates: <span id="draws">{draws}</span></p>
                <p>Vitórias do Bot: <span id="bot-wins">{botWins}</span></p>
            </div>

            <div className="card game-card">
                <h1>Jokenpô</h1>

                <div className="choices">
                    <button
                        className="choice-btn"
                        onClick={() => playgame("Pedra")}
                        disabled={gameOver && win === "Vitória do Bot"}
                    >
                        Pedra
                    </button>
                    <button
                        className="choice-btn"
                        onClick={() => playgame("Papel")}
                        disabled={gameOver && win === "Vitória do Bot"}
                    >
                        Papel
                    </button>
                    <button
                        className="choice-btn"
                        onClick={() => playgame("Tesoura")}
                        disabled={gameOver && win === "Vitória do Bot"}
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
        </div>
    );
}

export default Game;
