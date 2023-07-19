import TreeChart from "./TreeChart";
import ClassChecklist from "./ClassChecklist";
import ClassNavBar from "./ClassNavBar";
import ParkSideNavBar from "./ParksideNavBar";
  
  const ComputerScienceMajorPage = () => {
    
    const initialCsData = {
      name: "Graduation Path",
      children:[
        {
          name: "First Year",
          children:[
            {
              name: "First Semester",
              children:[
                {
                  name: "MATH 114"
                },
                {
                  name: "ENG 101"
                },
                {
                  name:"Modern Language"
                }
              ]
            },
            {
              name: "Second Semester",
              children:[
                {
                  name:"CSCI 241"
                },
                {
                  name:"CSCI 231"
                },
                {
                  name:"Modern Language"
                },
                {
                  name: "General Education Course (DV)"
                }
              ]
            }
          ]
        },
        {
          name: "Second Year",
          children:[
            {
              name: "First Semester",
              children:[
                {
                  name:"CSCI 242"
                },
                {
                  name:"CSCI 245"
                },
                {
                  name:"MATH 221"
                },
                {
                  name:"General Education Course"
                }
              ]
            },
            {
              name: "Second Semester",
              children:[
                {
                  name:"CSCI 309"
                },
                {
                  name:"CSCI 355"
                },
                {
                  name:"CSCI 340"
                },
                {
                  name:"General Education Course"
                },
                {
                  name:"Computer Science Breadth"
                }
              ]
            }
          ]
        },
        {
          name: "Third Year",
          children:[
            {
              name: "First Semester",
              children:[
                {
                  name:"CSCI 370"
                },
                {
                  name:"CSCI 380"
                },
                {
                  name:"Computer Science Elective"
                },
                {
                  name:"General Education Course"
                },
                {
                  name:"Computer Science Breadth"
                }
              ]
            },
            {
              name:"Second Semester",
              children:[
                {
                  name:"CHEM 101 OR PHYS 201"
                },
                {
                  name:"CSCI 333"
                },
                {
                  name:"Computer Science Elective"
                },
                {
                  name:"General Education Course"
                }
              ]
            }
          ]
        },
        {
          name: "Fourth Year",
          children:[
            {
              name:"First Semester",
              children:[
                {
                  name:"CSCI 475"
                },
                {
                  name:"Computer Science Elective"
                },
                {
                  name:"General Education Course"
                },
                {
                  name:"Computer Science Seminar"
                },
                {
                  name:"Elective"
                }
              ]
            },
            {
              name:"Second Semester",
              children:[
                {
                  name:"CSCI 476"
                },
                {
                  name:"Computer Science Elective"
                },
                {
                  name:"Computer Science Breadth"
                },
                {
                  name:"General Education Course"
                },
                {
                  name:"Elective"
                }
              ]
            }
        
          ]
        }
      ]
      }
    return(
       <div className="relative overflow-y-scroll">
    <div className="fixed top-[50px] p-[100px] text-black">
      <div><TreeChart data={initialCsData} className='flex justify-center top-[200px] overflow-visible pr-0 pb-190px pl-[450px] '/></div>
    </div>
        <ParkSideNavBar />
        <ClassNavBar />
        <ClassChecklist />
      </div>
    )
}
export default ComputerScienceMajorPage;