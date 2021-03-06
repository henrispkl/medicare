import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import Page from '../../components/Page/Page';
import styles from './Professionals.module.css';
import DoctorImg from '../../assets/images/doctor.jpg';
import NurseImg from '../../assets/images/nurse.jpg';
import Spinner from '../../components/Spinner/Spinner';
import PrimaryButton from '../../components/Buttons/PrimaryButton/PrimaryButton';
import { connect } from 'react-redux';

const Professionals = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [loadedDoctors, setLoadedDoctors] = useState(false);
  const [loadedNurses, setLoadedNurses] = useState(false);

  useEffect(() => {
    API.get('/doctors')
      .then((res) => {
        setDoctors(res.data);
        setLoadedDoctors(true);
      })
      .catch((err) => {
        console.log(err);
      });

    API.get('/nurses')
      .then((res) => {
        setNurses(res.data);
        setLoadedNurses(true);
      })
      .catch((err) => {
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
          {doctors.map((doctor) => (
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
          {nurses.map((nurse) => (
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
          <div className={styles.TitleBar}>
            <h1>Doctors</h1>
            {props.isAuthenticated && (
              <Link
                className={styles.AddProfessionalButton}
                to="/professionals/add#doctor"
              >
                <PrimaryButton>
                  <i className="fas fa-user-md"></i> Add a doctor
                </PrimaryButton>
              </Link>
            )}
          </div>
          {doctorsTable}
        </div>

        <div className={styles.Nurses}>
          <div className={styles.TitleBar}>
            <h1>Nurses</h1>
            {props.isAuthenticated && (
              <Link
                className={styles.AddProfessionalButton}
                to="/professionals/add#nurse"
              >
                <PrimaryButton>
                  <i className="fas fa-user-nurse"></i> Add a nurse
                </PrimaryButton>
              </Link>
            )}
          </div>
          {nursesTable}
        </div>
      </div>
    </Page>
  );
};

export default connect((store) => ({
  isAuthenticated: store.auth.isAuthenticated,
}))(Professionals);
