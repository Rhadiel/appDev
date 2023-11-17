import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import BasicSelect from '../components/DropDownSelect';
import DatePickerValue from '../components/DatePicker';
import TimePickerValue from '../components/Timepicker';
import '../css/appBooking.css';

export const AppBooking = () => {
  const name = "Rhadiel Gwapo Filler";
  const [date, setDate] = useState({});
  const [time, setTime] = useState({});
  const [service, setService] = useState({});

  const handleDate = (dateData) => {
    setDate(dateData.format("YYYY-MM-DD"));
  };

  const handleTime = (timeData) => {
    setTime(timeData.format("YYYY-MM-DDTHH:mm:ss"));
  };

  const handleService = (serviceData) => {
    setService(serviceData);
  };

  useEffect(() => {
    console.log("date"+date);
    console.log("time"+time);
    // console.log(service);
  }, [service, date, time]);

  const inactiveButton = {
    color: 'black',
    backgroundColor: 'rgb(190, 162, 44)',
    padding: '20px',
    minWidth: '200px',
  };

  const activeButton = {
    color: 'black',
    backgroundColor: 'rgb(254, 216, 57)',
    padding: '20px',
    border: 'solid 1px',
    minWidth: '200px',
  };

  const submitBooking = async () => {
    try {
      // Make sure to add the appropriate headers for CORS
      await axios.post("http://localhost:8080/appointment/insertAppointment", {
        date: date,
        time: time,
        servtype: 10,
        pid: 1,
        sid: 1,
        status: false
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  return (
    <div className="appBookBg">
      <div className="sideNav">
        <div className='sideNavButtons'>
          <Link to='/appointments/booking'>
            <Button className='btnBookApp' style={activeButton}>Book Appointment</Button>
          </Link>
          <br /><br />
          <Link to='/appointments/view-appointments'>
            <Button className='btnViewApp' style={inactiveButton}>View Appointments</Button>
          </Link>
        </div>
      </div>
      <div className="mainBody">
        <div className="outsideOuterSquare">
          <h3>APPOINTMENT SERVICES</h3>
          <div className="appBookOutSquare">
            <div className="appBookInSquare">
              <div className='inputData'>
                <div className="inputContainer">
                  <div className="inputField">
                    <span>Name:</span>
                  </div>
                  <div className="inputData">
                    <span>{name}</span>
                  </div>
                </div>
                <div className="inputContainer">
                  <div className="inputField">
                    <span>Service Type:</span>
                  </div>
                  <span className="inputData">
                    <BasicSelect parentalCallback={handleService} />
                  </span>
                </div>
                <div className="inputContainer">
                  <div className="inputField">
                    <span className='inputField'>Date: </span>
                  </div>
                  <span className="inputData">
                    <DatePickerValue parentalCallback={handleDate} />
                  </span>
                </div>
                <div className="inputContainer">
                  <div className="inputField">
                    <span className='inputField'>Time: </span>
                  </div>
                  <span className="inputData">
                    <TimePickerValue parentalCallback={handleTime} />
                  </span>
                </div>
              </div>
              <br />
              <Button
                style={{ color: 'black', backgroundColor: 'rgb(223, 190, 57)', width: '100px', boxShadow: '2px 2px 2px 0px' }}
                onClick={submitBooking}
              >Submit</Button>
              <br /><br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
