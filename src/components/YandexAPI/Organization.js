import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import {
  getOrganizationCoords,
  setOrganizationCoords,
  setOrganizationName,
  clearOrganizationData,
} from '../../../redux/actions/yandexAPI';
import '../../../assets/scss/yandexAPI/organization.scss'

class Organization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: '',
    };
    this.orgzContainer = React.createRef();
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  };
  handleClickOutside = e => {
    if(this.orgzContainer.current && !this.orgzContainer.current.contains(e.target)) {
      this.setState({
        open: false,
      })
    }
  };

  handleOnChange = e => {
    this.props.onChange({
      name: e.target.value
    });
    if(this.props.cityCoordinates && this.props.cityCoordinates.boundedBy && e.target.value.length >= 3) {
      this.props.getOrganizationCoords(
        e.target.value,
        this.props.cityCoordinates.coordinates,
        this.props.cityCoordinates.boundedBy
      );
      this.setState({open: true})
    }
  };

  handleClick = item => {
    this.setState({
      open: false
    });
    this.props.onChange(
      {
        name: item.properties.name,
        coords: item
      }
    );
  };

  handleClickAvInput = (e) => {
    if(e.target.value.length >= 3 && this.props.cityCoordinates && this.props.cityCoordinates.boundedBy) {
      this.props.getOrganizationCoords(
        e.target.value,
        this.props.cityCoordinates.coordinates,
        this.props.cityCoordinates.boundedBy
      );
      this.setState({open: true})
    }
  };

  render() {
    return (
      <>
        <div className={`orgz-result-container`} ref={this.orgzContainer}>
          <div className="suggest-options-block">
            <input
              className={this.props.className}
              type="text"
              name={this.props.id}
              id={this.props.id}
              placeholder={this.props.placeholder}
              autoComplete="off"
              value={this.props.value}
              onChange={e=>this.handleOnChange(e)}
              onClick={e=>this.handleClickAvInput(e)}
              disabled={this.props.disabled || false}
            />
          </div>
          {this.props.organizations && this.props.organizations.length > 0 && this.state.open &&
          <div className="orgz-result">
            <ul>
              {this.props.organizations.map((item, index) => {
                if (item.properties && index < 5) {
                  return (
                    <li
                      key={index}
                      onClick={() => this.handleClick(item)}
                    >
                      <p>{item.properties.name}</p>
                      <span>{item.properties.description}</span>
                    </li>
                  )
                }
              })}
            </ul>
          </div>
          }
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    organizations: state.yandexAPI.organizations,
    organization: state.yandexAPI.organization,
    cityStatus: state.yandexAPI.cityStatus,
    cityCoordinates: state.YandexAPI.cityCoordinates
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  clearOrganizationData,
  setOrganizationName,
  getOrganizationCoords,
  setOrganizationCoords,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Organization);
