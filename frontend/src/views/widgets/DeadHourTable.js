import React from 'react'
import './deadHourTable.css';

let isClicked = false;
export default function DeadHourTable({ updateList }) {

    const [cellStates, setCellStates] = React.useState(new Array(24).fill(false));

    const clickCell = (i) => {
        isClicked = true;
        setCellStates((s) => {
            let temp = s;
            temp[i] = !temp[i];
            return [...temp]
        });
    }

    const selectCell = (i) => {
        if (isClicked) {

            setCellStates((s) => {
                let temp = s;
                temp[i] = !temp[i];
                return  [...temp]
            });
        }
    }

    React.useEffect(() => {
        document.addEventListener("mouseup", () => { isClicked = false;}, false);
    }, [])

    React.useEffect(() => {
        updateList(cellStates);
    }, [cellStates])


    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th className={`${cellStates[0] ? "selected" : ""}`} onMouseOver={() => selectCell(0)} onMouseDown={() => clickCell(0)}>0</th>
                        <th className={`${cellStates[1] ? "selected" : ""}`} onMouseOver={() => selectCell(1)} onMouseDown={() => clickCell(1)}>1</th>
                        <th className={`${cellStates[2] ? "selected" : ""}`} onMouseOver={() => selectCell(2)} onMouseDown={() => clickCell(2)}>2</th>
                        <th className={`${cellStates[3] ? "selected" : ""}`} onMouseOver={() => selectCell(3)} onMouseDown={() => clickCell(3)}>3</th>
                        <th className={`${cellStates[4] ? "selected" : ""}`} onMouseOver={() => selectCell(4)} onMouseDown={() => clickCell(4)}>4</th>
                        <th className={`${cellStates[5] ? "selected" : ""}`} onMouseOver={() => selectCell(5)} onMouseDown={() => clickCell(5)}>5</th>
                        <th className={`${cellStates[6] ? "selected" : ""}`} onMouseOver={() => selectCell(6)} onMouseDown={() => clickCell(6)}>6</th>
                        <th className={`${cellStates[7] ? "selected" : ""}`} onMouseOver={() => selectCell(7)} onMouseDown={() => clickCell(7)}>7</th>
                        <th className={`${cellStates[8] ? "selected" : ""}`} onMouseOver={() => selectCell(8)} onMouseDown={() => clickCell(8)}>8</th>
                        <th className={`${cellStates[9] ? "selected" : ""}`} onMouseOver={() => selectCell(9)} onMouseDown={() => clickCell(9)}>9</th>
                        <th className={`${cellStates[10] ? "selected" : ""}`} onMouseOver={() => selectCell(10)} onMouseDown={() => clickCell(10)}>10</th>
                        <th className={`${cellStates[11] ? "selected" : ""}`} onMouseOver={() => selectCell(11)} onMouseDown={() => clickCell(11)}>11</th>
                    </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                    <tr>
                        <th className={`${cellStates[12] ? "selected" : ""}`} onMouseOver={() => selectCell(12)} onMouseDown={() => clickCell(12)}>12</th>
                        <th className={`${cellStates[13] ? "selected" : ""}`} onMouseOver={() => selectCell(13)} onMouseDown={() => clickCell(13)}>13</th>
                        <th className={`${cellStates[14] ? "selected" : ""}`} onMouseOver={() => selectCell(14)} onMouseDown={() => clickCell(14)}>14</th>
                        <th className={`${cellStates[15] ? "selected" : ""}`} onMouseOver={() => selectCell(15)} onMouseDown={() => clickCell(15)}>15</th>
                        <th className={`${cellStates[16] ? "selected" : ""}`} onMouseOver={() => selectCell(16)} onMouseDown={() => clickCell(16)}>16</th>
                        <th className={`${cellStates[17] ? "selected" : ""}`} onMouseOver={() => selectCell(17)} onMouseDown={() => clickCell(17)}>17</th>
                        <th className={`${cellStates[18] ? "selected" : ""}`} onMouseOver={() => selectCell(18)} onMouseDown={() => clickCell(18)}>18</th>
                        <th className={`${cellStates[19] ? "selected" : ""}`} onMouseOver={() => selectCell(19)} onMouseDown={() => clickCell(19)}>19</th>
                        <th className={`${cellStates[20] ? "selected" : ""}`} onMouseOver={() => selectCell(20)} onMouseDown={() => clickCell(20)}>20</th>
                        <th className={`${cellStates[21] ? "selected" : ""}`} onMouseOver={() => selectCell(21)} onMouseDown={() => clickCell(21)}>21</th>
                        <th className={`${cellStates[22] ? "selected" : ""}`} onMouseOver={() => selectCell(22)} onMouseDown={() => clickCell(22)}>22</th>
                        <th className={`${cellStates[23] ? "selected" : ""}`} onMouseOver={() => selectCell(23)} onMouseDown={() => clickCell(23)}>23</th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
