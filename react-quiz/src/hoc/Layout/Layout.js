import React, {Component} from 'react'
import './Layout.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import { connect } from 'react-redux'

 class Layout extends Component {
    state={
        menu:false
    }

    onClickBackdropHandler() {
        this.setState({
            menu:!this.state.menu
        })
    }

    onToggleHandler=() => {
        this.setState({
            menu:!this.state.menu
        })
    }

    render() {
        return (
            <div className='Layout'>
                   <MenuToggle
                     onToggle={this.onToggleHandler}
                     isOpen={this.state.menu}/>

                     {
                     this.state.menu
                     ?
                     <Drawer 
                        onClick={this.onClickBackdropHandler.bind(this)}
                        isAuthenticated={this.props.isAuthenticated}
                     />
                    :
                     null
                    }
                {this.props.children}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated:!!state.auth.token
    }
}

export default connect(mapStateToProps,null)(Layout)