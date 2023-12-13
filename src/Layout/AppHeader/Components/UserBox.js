import React from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
import { toast, Bounce } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../AppMain/AuthContext';
import routeConstant from '../../../router/routeConstant';

const UserBox = () => {
  const { logout } = useAuth();
  const history = useHistory();

  const cerrarSesion = () => {
    logout();
    history.push(routeConstant.LOGIN);
  };

  const notify2 = () => {
    toast("You don't have any new items in your calendar for today! Go out and play!", {
      transition: Bounce,
      closeButton: true,
      autoClose: 5000,
      position: 'bottom-center',
      type: 'success'
    });

  };


  const getUsername = () => {
    const userInfo = JSON.parse(localStorage.getItem('info'));
    const {nombre, primerApellido, segundoApellido} = userInfo;
    return `${nombre} ${primerApellido} ${segundoApellido || ''}`;
  };

  return (
    <div className="header-btn-lg pe-0">
      <div className="widget-content p-0">
        <div className="widget-content-wrapper">
          <div className="widget-content-left ms-3 header-user-info">
            <div className="widget-heading" style={{color:'black'}}>
               { getUsername() }
            </div>
          </div>
          <div className="widget-content-right header-user-info ms-3">
            <Button className="p-1" size="lg" onClick={cerrarSesion} color="dark" id="Tooltip-1">
              <i className="pe-7s-power" />
            </Button>
            <UncontrolledTooltip placement="bottom" target={'Tooltip-1'}>
              Cerrar sesión
            </UncontrolledTooltip>
          </div>
        </div>
      </div>
    </div>
  );
};



export default UserBox;

