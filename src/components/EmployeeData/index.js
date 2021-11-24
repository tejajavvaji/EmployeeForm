import {Component} from 'react'
import './index.css'

export default class EmployeeData extends Component {
  state = {
    employeeData: [],
    name: '',
    designation: '',
    contactDetails: [{type: '', number: ''}],
    skills: [''],
    DOB: '',
    errorMsg: '',
    showData: false,
  }

  updateName = event => {
    this.setState({name: event.target.value})
  }

  updateDesignation = event => {
    this.setState({designation: event.target.value})
  }

  updateDOB = event => {
    this.setState({DOB: event.target.value})
  }

  updateContactDetails = (index, event) => {
    const {contactDetails} = this.state
    contactDetails[index][event.target.id] = event.target.value
    this.setState({contactDetails})
  }

  updateSkills = (index, event) => {
    const {skills} = this.state
    skills[index] = event.target.value
    this.setState({skills})
  }

  verifyContacts = index => {
    this.setState({errorMsg: ''})
    const {contactDetails} = this.state
    const {number, type} = contactDetails[index]

    if (number !== '') {
      if (Number.isNaN(Number(number)) === true) {
        this.setState({
          errorMsg: '* Number cannot contain Alphabets or special characters',
        })
        return false
      }
      if (number.length !== 10) {
        this.setState({
          errorMsg: '* Phone number should consists of 10 digits',
        })
        return false
      }
      if (type === '') {
        this.setState({errorMsg: '* Phone number type cannot be Empty'})
        return false
      }
    }
    return true
  }

  verifyContactsOnSubmit = contact => {
    const {type, number} = contact
    if (number !== '') {
      if (Number.isNaN(Number(number)) === true) {
        this.setState({
          errorMsg: '* Number cannot contain Alphabets or special characters',
        })
        return false
      }
      if (number.length !== 10) {
        this.setState({
          errorMsg: '* Phone number should consists of 10 digits',
        })
        return false
      }
      if (type === '') {
        this.setState({errorMsg: '* Phone number type cannot be Empty'})
        return false
      }
    }
    return true
  }

  formSubmit = event => {
    event.preventDefault()
    this.setState({errorMsg: ''})
    const {name, designation, contactDetails} = this.state
    if (name === '') {
      this.setState({errorMsg: '* Name cannot be Empty'})
      return null
    }
    if (designation === '') {
      this.setState({errorMsg: '* Designation cannot be Empty'})
      return null
    }
    let one = false
    contactDetails.map(eachContact => {
      const {number} = eachContact
      if (number !== '') {
        one = true
        return null
      }
      return null
    })
    if (one === false) {
      this.setState({errorMsg: '* Add at least one Phone number'})
      return null
    }
    const verifyContacts = contactDetails.map(eachContact => {
      if (this.verifyContactsOnSubmit(eachContact) === false) {
        return false
      }
      return true
    })

    if (verifyContacts.includes(false) === true) {
      return null
    }
    const {employeeData, skills, DOB} = this.state

    this.setState({
      employeeData: [
        ...employeeData,
        {
          name,
          designation,
          contactDetails,
          skills,
          DOB,
        },
      ],
      name: '',
      designation: '',
      contactDetails: [{type: '', number: ''}],
      skills: [''],
      DOB: '',
    })

    return null
  }

  addNewContact = () => {
    const {contactDetails} = this.state
    if (contactDetails.length < 4) {
      this.setState({
        contactDetails: [...contactDetails, {type: '', number: ''}],
      })
    }
  }

  removeContact = index => {
    const {contactDetails} = this.state
    contactDetails.splice(index, 1)
    this.setState({contactDetails})
  }

  addNewSkill = () => {
    const {skills} = this.state
    this.setState({skills: [...skills, '']})
  }

  removeSkill = index => {
    const {skills} = this.state
    skills.splice(index, 1)
    this.setState({skills})
  }

  plusOrMinus = (index, add, remove) => {
    if (index === 0) {
      return (
        <button onClick={add} type="button" className="plus">
          +
        </button>
      )
    }
    return (
      <button onClick={remove} type="button" className="minus">
        -
      </button>
    )
  }

  clearErrorMsg = event => {
    if (event.target.value !== '') {
      this.setState({errorMsg: ''})
    }
  }

  changeDataVisibility = () => {
    const {showData} = this.state
    this.setState({showData: !showData})
  }

  renderContactDetails = eachContact => {
    if (eachContact.type !== '') {
      return (
        <p>
          {eachContact.type} - {eachContact.number}
        </p>
      )
    }
    return null
  }

  renderEmployeeCard = (eachEmployee, index) => {
    const {contactDetails, skills} = eachEmployee
    const updatedSkills = skills.filter(empty => empty)
    return (
      <div id={contactDetails[0].number} className="employeeDataCard">
        <p className="tag">Employee# {index + 1}</p>
        <p>Name : {eachEmployee.name}</p>
        <p>Designation : {eachEmployee.designation}</p>
        <p>Contact Details :</p>
        {contactDetails.map(eachContact =>
          this.renderContactDetails(eachContact),
        )}
        <p>Skills : {updatedSkills.join()}</p>
        <p>DOB : {eachEmployee.DOB}</p>
      </div>
    )
  }

  renderForm = () => {
    const {
      name,
      designation,
      DOB,
      contactDetails,
      skills,
      errorMsg,
    } = this.state
    return (
      <form onSubmit={this.formSubmit}>
        <label className="mandatory" htmlFor="name">
          Name
        </label>
        <input value={name} onChange={this.updateName} id="name" type="input" />
        <label className="mandatory" htmlFor="Designation">
          Designation
        </label>
        <input
          value={designation}
          onChange={this.updateDesignation}
          id="Designation"
          type="input"
        />
        <div className="dataCon">
          <label className="mandatory" htmlFor="number">
            Contact Details
          </label>

          {contactDetails.map((eachContact, index) => (
            <div className="numberCon">
              <div className="dynamicContacts">
                <input
                  onChange={event => this.updateContactDetails(index, event)}
                  onBlur={this.clearErrorMsg}
                  value={eachContact.type}
                  placeholder="Type"
                  id="type"
                  type="input"
                />
                <input
                  onChange={event => this.updateContactDetails(index, event)}
                  onBlur={() => this.verifyContacts(index)}
                  value={eachContact.number}
                  placeholder="Phone Number"
                  id="number"
                  type="input"
                />
              </div>
              <div className="dynamicButtonCon">
                {this.plusOrMinus(index, this.addNewContact, () =>
                  this.removeContact(index),
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="dataCon">
          <label htmlFor="skills">Skills</label>
          {skills.map((eachSkill, index) => (
            <div className="skillsCon">
              <div className="dynamicSkills">
                <input
                  value={eachSkill}
                  onChange={event => this.updateSkills(index, event)}
                  id="skills"
                  type="input"
                />
              </div>
              <div className="dynamicButtonCon">
                {this.plusOrMinus(index, this.addNewSkill, () =>
                  this.removeSkill(index),
                )}
              </div>
            </div>
          ))}
        </div>

        <label htmlFor="date">Date Of Birth</label>
        <input value={DOB} onChange={this.updateDOB} id="date" type="date" />
        <button className="submitBtn" type="submit">
          Add Employee
        </button>
        <p className="error">{errorMsg}</p>
      </form>
    )
  }

  render() {
    const {employeeData, showData} = this.state
    return (
      <div className="main">
        <div className="formCard">
          <h1 className="heading">Employee Data</h1>
          {this.renderForm()}
        </div>

        <button
          onClick={this.changeDataVisibility}
          className={
            employeeData.length !== 0 ? 'dataBtn dataBtnColor' : 'dataBtn'
          }
          disabled={employeeData.length === 0}
          type="button"
        >
          {showData ? 'Hide Data' : 'View Data'}
        </button>

        {employeeData.length !== 0 ? (
          /* The following anchor element is inspired from stackoverflow code snippet
          This helps in downloading the JSON file */
          <a
            className="dataBtn dataBtnColor"
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(employeeData),
            )}`}
            download="EmployeeData.json"
          >
            Download Data
          </a>
        ) : (
          <button type="button" disabled="true" className="dataBtn">
            Download Data
          </button>
        )}

        {showData && (
          <div className="employeeDataCon">
            {employeeData.map((eachEmployee, index) =>
              this.renderEmployeeCard(eachEmployee, index),
            )}
          </div>
        )}
      </div>
    )
  }
}
