import React from "react"
import {Row, Col, FormGroup, Input, Button} from "reactstrap"
import {Search, Menu, Calendar} from "react-feather"
import Flatpickr from "react-flatpickr"
import { Russian } from 'flatpickr/dist/l10n/ru.js'
import {EVENTS_MODAL_STATUS} from '../../../redux/constants/events'
import "flatpickr/dist/flatpickr.min.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"

const EventsContent = React.memo(props => {
  return (
    <div className="shop-content">
      <Row>
        <Col sm="12">
          <div className="ecommerce-header-items">
            <div className="result-toggler w-25 d-flex align-items-center">
              <div className="shop-sidebar-toggler d-block d-lg-none">
                <Menu size={26} onClick={() => props.mainSidebar(true)}/>
              </div>
            </div>
          </div>
        </Col>
        <Col sm="12">
          <Row>
            <Col md={7}>
              <div className="ecommerce-searchbar">
                <FormGroup className="position-relative">
                  <Input
                    className="search-product"
                    placeholder="Попробуй поискать здесь"
                  />
                  <div className="form-control-position">
                    <Search size={22} />
                  </div>
                </FormGroup>
              </div>
            </Col>
            <Col md={2}>
              <div className="events__filter-date">
                <FormGroup className="position-relative">
                  <Flatpickr
                    value={new Date()}
                    className="form-control text-center"
                    options={{
                      dateFormat: "d-m-Y",
                      locale: Russian,
                    }}
                  />
                  <div className="form-control-position">
                    <Calendar size={22} />
                  </div>
                </FormGroup>
              </div>
            </Col>
            <Col md={3}>
                <Button.Ripple
                  block
                  color="primary"
                  className="events__add-btn btn-block px-md-6"
                  onClick={() => props.setData(EVENTS_MODAL_STATUS, true)}
                >
                  Добавить событие
                </Button.Ripple>
            </Col>
          </Row>
        </Col>
        <Col sm="12">
          <div id="ecommerce-products">
            Elem
          </div>
        </Col>
      </Row>
    </div>
  )
})

export default EventsContent
