import ClassNavBar from "./ClassNavBar";
import ParkSideNavBar from "./ParksideNavBar";
import React, { useEffect, useState } from "react";
import user from "./icon/Users.png";
import './User.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from '../config/Firebase';
import { updateDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


const User = () => {

    const [profilePic, setProfilePic] = useState(user);
    const [major, setMajor] = useState("");
    const [enrollmentYear, setEnrollmentYear] = useState("");
    const [minor, setMinor] = useState("");
    const [graduate, setGraduate] = useState("");
    const [certificate, setCertificate] = useState("");
    const [docRef, setDocRef] = useState("");

    const navigate = useNavigate();

    const handleButtonClick = () => {
      navigate('/user-classes');
    };

    const auth = getAuth();
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                try{
                    console.log("Current user ID: " + user.uid);
                const uid = user.uid;
                setDocRef(doc(db, "Users", uid));
                console.log("docRef " + docRef + " was created.")
                }
                catch (err) {
                    console.error(err);
                }
            } else {
                console.log("No current user signed in.");
            }
        });
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(docRef, {
                major: major,
                enrollmentYear: enrollmentYear,
                minor: minor,
                graduate: graduate,
                certificate: certificate,
            });
            console.log("Form data submitted successfully.");
        } catch (err) {
            console.error(err);
        }
    };


    const handlePicChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setProfilePic(event.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleMinorChange = (e) => {
        setMinor(e.target.value);
    };

    const handleCertificateChange = (e) => {
        setCertificate(e.target.value);
    };

    const handleMajorChange = (e) => {
        setMajor(e.target.value);
    };

    const handleGraduateChange = (e) => {
        setGraduate(e.target.value);
    };

    const handleEnrollmentYearChange = (e) => {
        setEnrollmentYear(e.target.value);
    };


    return (
        <div>
            <ParkSideNavBar />
            <ClassNavBar />
            <div>
                <div className="UserProfile">
                    <h2>User Profile</h2>
                    <div>
                        <img
                            className="blank img"
                            src={profilePic}
                            alt="Profile Picture"
                            style={{
                                maxWidth: "200px",
                                borderRadius: "50%",
                                overflow: "hidden",
                            }}
                        />
                        <label>
                            Profile Picture:
                            <input type="file" onChange={handlePicChange} accept="image/*" />
                        </label>
                    </div>
                    <label>
                        Graduate:
                        <select value={graduate} onChange={handleGraduateChange}>
                            <option value="">Select Graduate</option>
                            <option value="mba">Business Administration (MBA)</option>
                            <option value="bioCert">Applied Bioinformatics Certificate</option>
                            <option value="bioMS">Applied Biotechnology (MS)</option>
                            <option value="profSudies">Applied Professional Studies (MA)</option>
                            <option value="bioSci">Biological Sciences (MS)</option>
                            <option value="mba">Business Administration (MBA)</option>
                            <option value="clinicalHealthMS">Clinical Mental Health Counseling (MS)</option>
                            <option value="csMS">Computer and Information Systems (MS)</option>
                            <option value="profEducator">Content Expertise for the Professional Educator, Applied Professional Studies (MA)</option>
                            <option value="cybersecurity">Cybersecurity (MS)</option>
                            <option value="healthMS">Health and Wellness Management (MS)</option>
                            <option value="healthcareAdminMS">Healthcare Administration (MS)</option>
                            <option value="leadershipMA">Leadership and Public Service, Applied Professional Studies (MA)</option>
                            <option value="accountingAdminMBA">Master of Business Administration, Accounting</option>
                            <option value="projectManagement">Master of Business Administration, Program and Project Management</option>
                            <option value="professionalCommMA">Professional Communication (MA)</option>
                            <option value="seniorLivingCert">Senior Living and Services Leadership Certificate</option>
                            <option value="smartCityCert">Smart City, Policy and Civic Partnerships Certificate</option>
                            <option value="smartCityMA">Smart City, Policy and Planning, Applied Professional Studies (MA)</option>
                            <option value="sportsManagmentMS">Sport Management (MS)</option>
                            <option value="sustainCert">Sustainability and Well-being Certificate</option>
                            <option value="sustainableManagement">Sustainable Management (MS)</option>
                        </select>
                    </label>
                    <label>
                        Major:
                        <select value={major} onChange={handleMajorChange}>
                            <option value="">Select Major</option>
                            <option value="accountingMajor">Accounting</option>
                            <option value="healthScienceMajor">Applied Health Sciences</option>
                            <option value="HealthSciMedMajor">Applied Health Sciences, Medical Laboratory</option>
                            <option value="artMajor">Art</option>
                            <option value="bioScienceMajor">Biological Sciences</option>
                            <option value="businessAdminMajor">Business Administration, Competency-Based</option>
                            <option value="businessManagementMajor">Business Management</option>
                            <option value="businessOnlineMajor">Business Management Degree Completion Online</option>
                            <option value="businessFinanceMajor">Business Management, Finance</option>
                            <option value="businessHumanResourceMajor">Business Management, Human Resources</option>
                            <option value="chemMajor">Chemistry</option>
                            <option value="commMajor">Communication</option>
                            <option value="csmajor">Computer Science</option>
                            <option value="criminalMajor">Criminal Justice</option>
                            <option value="econManjor">Economics</option>
                            <option value="eduEarlyMajor">Education, Early Childhood</option>
                            <option value="eduElementryMajor">Education, Elementary</option>
                            <option value="eduSecondaryMajor">Education, Secondary</option>
                            <option value="eduSpecialMajor">Education, Special</option>
                            <option value="engMajor">Engineering (Consortial Program)</option>
                            <option value="englishMajor">English</option>
                            <option value="englishFlimMajor">English, Film and Cultural Studies</option>
                            <option value="environmentMajor">Environmental Studies</option>
                            <option value="geoMajor">Geography</option>
                            <option value="geographyMajor">Geography, Anthropology</option>
                            <option value="geoScienceMajor">Geosciences</option>
                            <option value="graphicDesignMajor">Graphic Design</option>
                            <option value="healthTechOnlineMajor">Health Information Management and Technology Online</option>
                            <option value="historyMajor">History</option>
                            <option value="internationalStudiesMajor">International Studies</option>
                            <option value="kinesiologyMajor">Kinesiology and Sport Performance</option>
                            <option value="liberalStudies">Liberal Studies</option>
                            <option value="managementInfoMajor">Management Information Systems</option>
                            <option value="marketingMajor">Marketing</option>
                            <option value="mathematicsMajor">Mathematics</option>
                            <option value="molecularBioMajor">Molecular Biology and Bioinformatics</option>
                            <option value="musicMajor">Music</option>
                            <option value="nursingMajor">Nursing (Consortial Program)</option>
                            <option value="philoMajor">Philosophy</option>
                            <option value="physicsMajor">Physics</option>
                            <option value="polSciMajor">Political Science</option>
                            <option value="polSciLawMajor">Political Science, Law</option>
                            <option value="psychMajor">Psychology</option>
                            <option value="psychMajorOnline">Psychology Online</option>
                            <option value="psychologyMajor">Psychology, Neuroscience</option>
                            <option value="sociologyMajor">Sociology</option>
                            <option value="spanishMajor">Spanish</option>
                            <option value="sportMangMajor">Sport Management</option>
                            <option value="sustainibleMajor">Sustainable Management</option>
                            <option value="theatreMajor">Theatre Arts</option>
                        </select>
                    </label>
                    <label>
                        Minor:
                        <select value={minor} onChange={handleMinorChange}>
                            <option value="">Select Minor</option>
                            <option value="anthroMinor">Anthropology</option>
                            <option value="BiologicalScienceMinor">Biological Sciences</option>
                            <option value="chemMinor">Chemistry</option>
                            <option value="coachingMinor">Coaching</option>
                            <option value="commMinor">Communication</option>
                            <option value="csMinor">Computer Science</option>
                            <option value="criminalJusticeMinor">Criminal Justice</option>
                            <option value="digitalMediaMinor">Digital Media and Production</option>
                            <option value="econMinor">Economics</option>
                            <option value="educationESLMinor">Education, English as a Second Language (ESL)</option>
                            <option value="englishMinor">English</option>
                            <option value="envStudiesMinor">Environmental Studies</option>
                            <option value="ethnicStudiesMinor">Ethnic Studies</option>
                            <option value="frenchMinor">French</option>
                            <option value="gisMinor">Geographic Information System (GIS)</option>
                            <option value="geoMinor">Geography</option>
                            <option value="geoScienceMinor">Geosciences</option>
                            <option value="globalManagementMinor">Global Management</option>
                            <option value="graphicDesignMinor">Graphic Design</option>
                            <option value="healthCommunicationMinor">Health Communication</option>
                            <option value="healthPsychMinor">Health Psychology</option>
                            <option value="historyMinor">History</option>
                            <option value="internationalStudiesMinor">International Studies</option>
                            <option value="kinsMinor">Kinesiology and Sport Performance</option>
                            <option value="legalStudiesMinor">Legal Studies</option>
                            <option value="managementInformationSystemsMinor">Management Information Systems</option>
                            <option value="mathMinor">Mathematics</option>
                            <option value="militaryMinor">Military Leadership</option>
                            <option value="musicMinor">Music</option>
                            <option value="organizationalCommunicationMinor">Organizational Communication</option>
                            <option value="philosophyMinor">Philosophy</option>
                            <option value="philoScienceMinor">Philosophy of Natural Science</option>
                            <option value="physicsMinor">Physics</option>
                            <option value="poliScienceMinor">Political Science</option>
                            <option value="psychMinor">Psychology</option>
                            <option value="publicPolicyMinor">Public Policy Studies</option>
                            <option value="publicRelationsMinor">Public Relations</option>
                            <option value="sociologyMinor">Sociology</option>
                            <option value="spanishMinor">Spanish</option>
                            <option value="sportMangementMinor">Sport Management</option>
                            <option value="studioArtMinor">Studio Art</option>
                            <option value="theatreArtMinor">Theatre Arts</option>
                            <option value="webDevelopmentMinor">Web Development</option>
                            <option value="womenMinor">Women's, Gender, and Sexuality Studies</option>
                            <option value="worldPoliticsMinor">World Politics</option>
                        </select>
                    </label>
                    <label>
                        Certificate:
                        <select value={certificate} onChange={handleCertificateChange}>
                            <option value="">Select Certificate</option>
                        </select>
                    </label>
                    <label>
                        Enrollment Year:
                        <input
                            type="string"
                            value={enrollmentYear}
                            onChange={handleEnrollmentYearChange}
                        />
                    </label>
                    <form onSubmit={submitHandler}>
                        {/* ... other form elements */}
                        <button 
                        className= 'user-submit'
                        type="submit">
                            Submit</button>
                    </form>
                    <button className="create-path" onClick={handleButtonClick}>
                        Make my paths
                        </button>
                        <br />
                        <button className="my-tree">View my paths</button>
                </div>
            </div>
        </div>
    )
}

export default User;