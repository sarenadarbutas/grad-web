import React, { useState, useEffect } from "react";
import { db } from "../config/Firebase";
import { getDocs, collection,  query, where } from "firebase/firestore";
import "./UserClassesSelect.css";
import ClassNavBar from "./ClassNavBar";
import ParkSideNavBar from "./ParksideNavBar";

const UserClassesSelect = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseNumbers, setSelectedCourseNumbers] = useState([]);
  const [formattedEnrollmentDate, setFormattedEnrollmentDate] = useState(null); // Add formattedEnrollmentDate state
  const [userName, setUserName] = useState("");
  const [savedCourses, setSavedCourses] = useState([]);
  const [semester, setSemester] = useState(1); // Use state to keep track of the semester
  const [userMajor, setUserMajor] = useState(null);

//Fetches courses from firebase
  useEffect(() => {
    const colRef = collection(db, "Courses");
    getDocs(colRef)
      .then((snapshot) => {
        let coursesList = [];
        snapshot.docs.forEach((doc) => {
          coursesList.push({ ...doc.data(), id: doc.id });
        });
        setCourses(coursesList);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  //Fetches User's enrollment date
  useEffect(() => {
    // Fetch enrollment date from Firestore and set formattedEnrollmentDate state
    const colRef = collection(db, "Users");
    //this is dumby data and will eventually need to be fixed so that it shows for each user that logins.
    const q = query(colRef, where("uid", "==", "ZzY6wPawRMQ2Gvt7EiaLT16i2ML2")); 
    getDocs(q)
      .then((snapshot) => {
        if (!snapshot.empty) {
          const userDoc = snapshot.docs[0];
          const enrollmentDate = userDoc.data().enrollmentDate;
          // Convert Firestore timestamp to formatted date string
          const date = enrollmentDate.toDate();
          const formattedDate = new Intl.DateTimeFormat("en-US").format(date);
          setFormattedEnrollmentDate(formattedDate);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  //Fetches major from firebase
  useEffect(() => {
    const fetchUserMajor = async () => {
      try {
        const usersMajorRef = collection(db, "Users");
        const queryMajor = query(usersMajorRef, where("major", "==", "Computer Science Major"));
        const querySnapshot = await getDocs(queryMajor);

        if (!querySnapshot.empty) {
          const userMajorData = querySnapshot.docs[0].data();
          setUserMajor(userMajorData.major); // Assuming "major" is the field name for the major in Firestore
        } else {
          console.log("User Major does not exist");
        }
      } catch (error) {
        console.log("Error fetching user's major:", error);
      }
    };

    fetchUserMajor();
  }, []);

// Fetches user's name from Firestore
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const usersRef = collection(db, "Users");
        const q = query(usersRef, where("displayName", "==", "Sarena Darbutas")); 
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          // If user document exists, update state with user's name
          const userData = querySnapshot.docs[0].data();
          setUserName(userData.displayName);
        } else {
          console.log("User document does not exist");
        }
      } catch (error) {
        console.error("Error fetching user's name:", error);
      }
    };

    fetchUserName();
  }, []);

  const handleCourseNumberChange = (event) => {
    const selectedCourseNumber = event.target.value;
    if (!selectedCourseNumbers.includes(selectedCourseNumber)) {
      setSelectedCourseNumbers([...selectedCourseNumbers, selectedCourseNumber]);
    }
  };

  const handleRemoveCourseNumber = (courseNumber) => {
    setSelectedCourseNumbers(
      selectedCourseNumbers.filter((number) => number !== courseNumber)
    );
  };

  const handleCourseSubmit = () => {
    // Create an array of objects for each selected course, with a unique ID and the selected course number
    const selectedCourses = selectedCourseNumbers.map((courseNumber, index) => ({
      id: `${courseNumber}_${index + 1}`,
      courseNumber: courseNumber
    }));
  
    // Determine the season based on the current semester
    const isSpringSemester = semester % 2 === 0;
    const season = isSpringSemester ? 'Spring' : 'Fall';
  
    // Determine the year based on the current semester and season
    let year = formattedEnrollmentDate.split('/')[2];
  
    // Keep the year the same for two consecutive semesters, then increment it for the next two semesters, and so on
    const yearIncrement = Math.floor((semester - 1) / 2);
    year = (parseInt(year) + yearIncrement).toString();
  
    const savedCoursesListId = `Semester ${semester} ${season} ${year}`;
  
    // Create a new saved course list by combining the previous savedCourses array with the selectedCourses array
    const newSavedCoursesList = [...savedCourses, { id: savedCoursesListId, courses: selectedCourses }];
  
    // Save the new saved course list to the savedCourses state array
    setSavedCourses(newSavedCoursesList);
  
    // Increment the semester for the next submission
    setSemester(semester + 1);
  
    // Clear the selectedCourseNumbers state array for the next submission
    setSelectedCourseNumbers([]);
  };


  // Calculate total credits for selected courses
  const totalCredits = courses.reduce(
    (total, course) =>
      selectedCourseNumbers.includes(course.CourseNumber)
        ? total + course.Credits
        : total,
    0
  );

  return (
    <>
      <ParkSideNavBar />
      <ClassNavBar />
      <div className="container">
      <h1 className="user-name">{userName}</h1>
      <h1 className="users-major">{userMajor}</h1>
        {formattedEnrollmentDate && (
          <h1 className="enrollment-date">
            Enrollment Date: {formattedEnrollmentDate}
          </h1>
        )}
        {/* Render saved courses on the left */}
        {savedCourses.map(savedCourseList => (
        <div key={savedCourseList.id}>
          <h3>{savedCourseList.id}</h3>
          <ul>
            {/* Render each course within the saved course list */}
            {savedCourseList.courses.map(course => (
              <li key={course.id}>{`${course.courseNumber}`}</li>
            ))}
          </ul>
        </div>
      ))}
        <div className="course-selection">
          <h1 className="title">Course Selection</h1>
          <label htmlFor="courseNumber" className="label">
            Select Course Number:
          </label>
          <select
            id="courseNumber"
            value={""}
            onChange={handleCourseNumberChange}
            className="select"
          >
            <option value="">-- Select Course Number --</option>
            {courses.map((course) => (
              <option key={course.id} value={course.CourseNumber}>
                {course.CourseNumber}
              </option>
            ))}
          </select>
          {selectedCourseNumbers.length > 0 && (
            <div className="selected-courses">
              <p className="label">Selected Course Numbers:</p>
              <ul>
                {selectedCourseNumbers.map((courseNumber) => (
                  <li key={courseNumber}>
                    {courseNumber}
                    <button
                      onClick={() => handleRemoveCourseNumber(courseNumber)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <p className="total-credits">Total Credits: {totalCredits}</p>
              <button onClick={handleCourseSubmit} className="submit-btn">
                Submit
              </button>
              </div>
            )}
        </div>
      </div>
    </>
  );
};


export default UserClassesSelect;
