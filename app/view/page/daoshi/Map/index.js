import React from 'react'
import ReactDOM from 'react-dom'
import data from './data'
import './index.less'

export default class Map extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      x: 0,
      y: 0,
      lx: 0,
      ly: 0,
    }
  }

  componentDidMount() {
    const place = data.floor[data.floor.length - 3].location
    const location = this.getPosition(3, place[0], place[1])

    this.setState({
      // eslint-disable-next-line react/no-unused-state
      data,
      lx: location.left,
      ly: location.top,
    })
  }

  getPosition = (n, x, y) => {
    const floor = ReactDOM.findDOMNode(this.refs[`floor_${n}`])
    const react = floor.getBoundingClientRect()
    const cx = react.width / 2 + react.left
    const cy = react.height / 2 + react.top + window.scrollY
    const fw = data.floor[data.floor.length - n].size[0]
    const rate = react.width / fw
    const left = cx + x * rate
    const top = cy - y * rate - 100
    return { left, top }
  }

  onChange = (e, coordinate) => {
    e.preventDefault()
    const position = this.getPosition(coordinate[2], coordinate[0], coordinate[1])
    this.setState({
      x: position.left,
      y: position.top,
      showPoint: true,
    })
  }

  render() {
    const { x, y, lx, ly, showPoint } = this.state
    const pointStyle = {
      left: `${x}px`,
      top: `${y}px`,
      visibility: showPoint ? 'visible' : 'hidden',
      opacity: showPoint ? 1 : 0,
    }
    const locationStyle = {
      left: `${lx}px`,
      top: `${ly}px`,
    }
    return (
      <div className="map">
        {data.floor.map((floor, index) => {
          return (
            <div className="floor" key={index} ref={`floor_${data.floor.length - index}`}>
              <img src={floor.image} />
            </div>
          )
        })}
        <div className="point" style={pointStyle} />
        <div className="location" style={locationStyle} />
        <div className="areas">
          {
            data.areas.map((area, index) => {
              return (
                <div className="area" key={index} onClick={e => this.onChange(e, area.coordinate)}>
                  <span className="color" style={{ background: `${area.color}` }} />
                  <span className="text">{area.name}</span>
                </div>
              )
            })
          }
          <div className="area">
            <span className="here" />
            <span className="text">你所在的位置</span>
          </div>
          <div className="area">
            <span className="wc" />
            <span className="text"> 洗手间</span>
          </div>
        </div>
      </div>
    )
  }
}
