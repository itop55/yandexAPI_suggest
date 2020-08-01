import React, {useEffect, useState} from 'react';
import '../../../assets/scss/yandexAPI/suggest.scss'

const Suggest = props => {

  const [status, setStatus] = useState(true);

  useEffect(()=> {
    const {ymaps} = window;
    ymaps && ymaps.ready(() => {
      let suggestView = new ymaps.SuggestView(props.id);
      suggestView.events && suggestView.events.add("select", e => {
        if (status) {
          const coordData = ymaps.geocode(e.get('item').value).then((res) => res.geoObjects.get(0));
          coordData.then(res => {
            props.onChange({
              name: e.get('item').value,
              coordinates: res.geometry.getCoordinates(),
              boundedBy: res.properties.get('boundedBy')
            });
            setStatus(false);
          })
        }
      })
    });
  }, []);

  return (
    <div className="suggest-options-block">
      <input
        className={props.className}
        type="text"
        name={props.id}
        id={props.id}
        placeholder={props.placeholder}
        value={props.defaultValue}
        onChange={e=>props.onChange({name: e.target.value})}
        required={props.required || false}
        disabled={props.disabled}
      />
    </div>
  )
};

export default Suggest;
