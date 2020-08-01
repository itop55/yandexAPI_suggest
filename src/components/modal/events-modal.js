import React from "react"
import { connect } from 'react-redux'
import {Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label} from "reactstrap"
import { AvForm, AvInput, AvGroup, AvFeedback } from "availity-reactstrap-validation"
import Flatpickr from "react-flatpickr"
import { Russian } from 'flatpickr/dist/l10n/ru.js'

import {EVENTS_MODAL_STATUS} from '../../../redux/constants/events'
import { createProject, updateProject, deleteProject } from '../../../redux/actions/projects'
import {setOrganizationName, setCityName} from '../../../redux/actions/yandexAPI'
import { setData } from '../../../redux/actions/helper'
import Suggest from "../../general/YandexAPI/Suggest";
import Organization from '../../../components/general/YandexAPI/Organization'
import "flatpickr/dist/flatpickr.min.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import "../../../assets/scss/components/reactstrap/modal/project-modal.scss"

class EventsModal extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)

    this.state = {
      selectProjectInvalid: false,
    }
  }

  handleSubmit(e) {
    console.log(e)
  }

  handleValidSubmitEvent(e, values) {
    console.log(e, values)
  }

  toggleModal = () => {
    this.props.setData(EVENTS_MODAL_STATUS, false)
  }

  handleInputChange(e) {
    this.props.setData(SET_MODAL_DATA, { [e.target.name]: e.target.value })
  }

  customValidation = () => {
    if(!this.props.selectedProject) {
      this.setState({selectProjectInvalid: true})
    }
  }

  selectProjectOnChange(e) {
    if(e.value) {
      this.setState({selectProjectInvalid: false})
    }
  }

  organizationOnChange = value => {
    this.props.setOrganizationName(value);
  }

  cityOnChange = value => {
    this.props.setCityName(value);
  }

  render() {
    const addEventData = this.props.addEventData;
    return (
      <React.Fragment>
        <Modal
          isOpen={this.props.modal}
          toggle={this.toggleModal}
          size="lg"
        >
          <ModalHeader toggle={this.toggleModal}>Добавить событие</ModalHeader>

          <AvForm onValidSubmit={this.handleValidSubmitEvent} className="authentication-form mt-1" id="addEventForm">
            <ModalBody>
              <Row>
                <Col md="5">
                  <div>
                    <AvGroup className={'event-form-item'}>
                      <Label for="projectList">Проект</Label>
                      <AvInput
                          className="popup-modal-input"
                          autoComplete="off"
                          type="text"
                          name="projectEvent"
                          id="projectEvent"
                          placeholder="Проект"
                          required
                      />
                      <AvFeedback>Поле обязательно для заполнения!</AvFeedback>
                    </AvGroup>
                  </div>
                  <div>
                    <AvGroup className={'event-form-item'}>
                      <Label for="nameEvent">Название</Label>
                      <AvInput
                        className="popup-modal-input"
                        autoComplete="off"
                        type="text"
                        name="nameEvent"
                        id="nameEvent"
                        placeholder="Название"
                        required
                      />
                      <AvFeedback>Поле обязательно для заполнения!</AvFeedback>
                    </AvGroup>
                  </div>
                </Col>
                <Col md="7">
                  <div>
                    <AvGroup className={'event-form-item suggest-options-block'}>
                      <Label for="cityEvent">Город</Label>
                      <Suggest
                          id='calendarCity'
                          value={addEventData.city.name}
                          onChange={this.cityOnChange}
                          className='popup-modal-input form-control'
                          placeholder='Город'
                          required
                      />
                      <AvFeedback>Поле обязательно для заполнения!</AvFeedback>
                    </AvGroup>
                  </div>
                  <div>
                    <AvGroup className={'event-form-item'}>
                      <Label for="positionEvent">Место</Label>
                      <Organization
                        id='organizationEventEdit'
                        className='popup-modal-input form-control'
                        value={addEventData.organization.name}
                        onChange={this.organizationOnChange}
                        cityCoordinates={addEventData.city}
                        disabled={!addEventData.city.name || false}
                        placeholder='Место'
                      />
                      <AvFeedback>Поле обязательно для заполнения!</AvFeedback>
                    </AvGroup>
                  </div>
                  <Row>
                    <Col md={6}>
                      <AvGroup className={'event-form-item'}>
                        <Label for="dateStartEvent">Дата начала</Label>
                        <Flatpickr
                          value={new Date()}
                          options={{
                            dateFormat: "d-m-Y",
                            minDate: "today",
                            locale: Russian,
                          }}
                          onChange={() => console.log("change")}
                          className="form-control popup-modal-input"
                          name="dateStartEvent"
                          id="dateStartEvent"
                        />
                      </AvGroup>
                    </Col>
                    <Col md={6}>
                      <AvGroup className={'event-form-item'}>
                        <Label for="timeStartEvent">Время начала</Label>
                        <Flatpickr
                          value={new Date()}
                          options={{
                            enableTime: true,
                            noCalendar: true,
                            dateFormat: "H:i",
                            time_24hr: true,
                          }}
                          onChange={time => { console.log(time) }}
                          className="form-control popup-modal-input"
                          name="timeStartEvent"
                          id="timeStartEvent"
                        />
                      </AvGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <AvGroup className={'event-form-item'}>
                        <Label for="dateEndEvent">Дата окончания</Label>
                        <Flatpickr
                          value={new Date()}
                          options={{
                            dateFormat: "d-m-Y",
                            locale: Russian,
                            minDate: new Date()
                          }}
                          onChange={() => console.log("change")}
                          className="form-control popup-modal-input"
                          name="dateEndEvent"
                          id="dateEndEvent"
                        />
                      </AvGroup>
                    </Col>
                    <Col md="6">
                      <AvGroup className={'event-form-item'}>
                        <Label for="timeEndEvent">Время окончания</Label>
                        <Flatpickr
                          value={new Date()}
                          options={{
                            enableTime: true,
                            noCalendar: true,
                            dateFormat: "H:i",
                            time_24hr: true,
                          }}
                          onChange={time => { console.log(time) }}
                          className="form-control popup-modal-input"
                          name="timeEndEvent"
                          id="timeEndEvent"
                        />
                      </AvGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button.Ripple
                color="primary"
                type="submit"
                className="project-modal-button"
                onClick={this.customValidation}
              >
                Сохранить
              </Button.Ripple>
            </ModalFooter>
          </AvForm>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    modal: state.events.modal,
    modalData: state.events.modalData,
    spinner: state.helper.spinner,
    projectsList: state.projects.list,
    selectedProject: state.projects.selectedProject,
    requestParams: state.analytics.analyticsRequestParams,
    addEventData: state.yandexAPI.addEventData
  }
}

export default connect(mapStateToProps, {
  setData,
  createProject,
  updateProject,
  deleteProject,
  setOrganizationName,
  setCityName,
})(EventsModal)
