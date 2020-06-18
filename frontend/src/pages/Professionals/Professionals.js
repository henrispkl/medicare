import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import Page from '../../components/Page/Page';
import styles from './Professionals.module.css';
import DoctorImg from '../../assets/images/doctor.jpg';
import NurseImg from '../../assets/images/nurse.jpg';
import Spinner from '../../components/Spinner/Spinner';

const Professionals = () => {
  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [loadedDoctors, setLoadedDoctors] = useState(false);
  const [loadedNurses, setLoadedNurses] = useState(false);

  useEffect(() => {
    API.get('http://localhost:4000/doctors')
      .then(res => {
        setDoctors(res.data);
        setLoadedDoctors(true);
      })
      .catch(err => {
        console.log(err);
      });

    API.get('http://localhost:4000/nurses')
      .then(res => {
        setNurses(res.data);
        setLoadedNurses(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  let doctorsTable = (
    <div className={styles.SpinnerContainer}>
      <Spinner />
    </div>
  );

  let nursesTable = (
    <div className={styles.SpinnerContainer}>
      <Spinner />
    </div>
  );

  if (loadedDoctors) {
    doctorsTable = (
      <table>
        <thead>
          <tr className={styles.TableHead}>
            <th>
              <i className="fas fa-user-circle"></i> Picture
            </th>
            <th>
              <i className="fas fa-signature"></i> Name
            </th>
            <th>
              <i className="fas fa-globe-americas"></i> Country
            </th>
            <th>
              <i className="fas fa-building"></i> Company
            </th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doctor => (
            <tr className={styles.Person} key={doctor._id}>
              <td className={styles.AvatarTd}>
                <img className={styles.Avatar} src={DoctorImg} alt="" />
              </td>
              <td className={styles.PersonName}>{doctor.name}</td>
              <td>{doctor.country}</td>
              <td>{doctor.company}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (loadedNurses) {
    nursesTable = (
      <table>
        <thead>
          <tr className={styles.TableHead}>
            <th>
              <i className="fas fa-user-circle"></i> Picture
            </th>
            <th>
              <i className="fas fa-signature"></i> Name
            </th>
            <th>
              <i className="fas fa-globe-americas"></i> Country
            </th>
            <th>
              <i className="fas fa-building"></i> Company
            </th>
          </tr>
        </thead>

        <tbody>
          {nurses.map(nurse => (
            <tr className={styles.Person} key={nurse._id}>
              <td className={styles.AvatarTd}>
                <img className={styles.Avatar} src={NurseImg} alt="" />
              </td>
              <td className={styles.PersonName}>{nurse.name}</td>
              <td>{nurse.country}</td>
              <td>{nurse.company}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <Page>
      <div className={styles.Professionals}>
        <div className={styles.Doctors}>
          <h1>Doctors</h1>
          {doctorsTable}
        </div>

        <div className={styles.Nurses}>
          <h1>Nurses</h1>
          {nursesTable}
        </div>
      </div>
    </Page>
  );
};

export default Professionals;
