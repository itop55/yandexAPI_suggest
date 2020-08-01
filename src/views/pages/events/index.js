import React from "react"
import {connect} from 'react-redux'
import Sidebar from "react-sidebar"
import EventsSidebar from "./EventsSidebar"
import EventsContent from "./EventsContent"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import EventsModal from '../../../components/pages/events/events-modal'
import {setData} from "../../../redux/actions/helper";
import "../../../assets/scss/pages/app-ecommerce-shop.scss"
import "../../../assets/scss/pages/events.scss"

const mql = window.matchMedia(`(min-width: 992px)`)
class Events extends React.PureComponent {
  state = {
    sidebarDocked: mql.matches,
    sidebarOpen: false
  }
  UNSAFE_componentWillMount() {
    mql.addListener(this.mediaQueryChanged)
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged)
  }

  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open })
  }

  mediaQueryChanged = () => {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false })
  }

  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Список событий"
          breadCrumbParent="События"
          breadCrumbActive="Список событий"
        />
        <EventsModal />
        <div className="ecommerce-application">
          <div
            className={`shop-content-overlay ${this.state.sidebarOpen ? "show" : ""}`}
            onClick={() => this.onSetSidebarOpen(false)}>
          </div>
          <div className="sidebar-section">
            <Sidebar
              sidebar={<EventsSidebar />}
              docked={this.state.sidebarDocked}
              open={this.state.sidebarOpen}
              sidebarClassName="sidebar-shop"
              touch={true}
              contentClassName="sidebar-children d-none">
              ""
            </Sidebar>
          </div>
          <EventsContent
            mainSidebar={this.onSetSidebarOpen}
            sidebar={this.state.sidebarOpen}
            setData={this.props.setData}
          />
        </div>
      </React.Fragment>
    )
  }
}
export default connect(null, {setData})(Events)

