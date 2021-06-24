import React from 'react';
import styles from './style.module.scss';
import cx from 'classnames';

const SeatMatrix = ({ seatOccupied, selectedSeats, onSelectedSeatsChange,numCol,numRow })=> {
    const seats = Array.from({ length: numCol * numRow }, (_, i) => i)
    
    function handleSelectedState(seat) {
      const isSelected = selectedSeats.includes(seat)
      if (isSelected) {
        onSelectedSeatsChange(
          selectedSeats.filter(selectedSeat => selectedSeat !== seat),
        )
      } else {
        onSelectedSeatsChange([...selectedSeats, seat])
      }
    }
  
    return (
      <div className={styles.seat_matrix}>
        <div className={styles.screen}>
            SCREEN
        </div>
  
        <div className={styles.seats} style={{gridColumn:{numCol}}}>
          {seats.map(seat => {
            const isSelected = selectedSeats.includes(seat)
            const isOccupied = seatOccupied.includes(seat)
            return (
              <span
                tabIndex="0"
                key={seat}
                className={cx(
                  styles.seat,
                  isSelected && styles.selected,
                  isOccupied && styles.occupied,
                )}
                onClick={isOccupied ? null : () => handleSelectedState(seat)} 
             >
               {seat}
             </span>
            )
          })}
        </div>
      </div>
    )
  }

  export default SeatMatrix