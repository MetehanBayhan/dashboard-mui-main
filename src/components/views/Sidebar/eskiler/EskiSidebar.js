import { useState } from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Sidebar as SidebarWrapper,
  Menu,
  MenuItem,
  SubMenu,
} from 'react-pro-sidebar';
import {} from 'react-icons/md';
import { BiDevices, BiHome, BiSquare, BiBracket } from 'react-icons/bi';
import { AiOutlineSetting, AiOutlineMenuUnfold } from 'react-icons/ai';
import {
  MdOutlineSensors,
  MdAdd,
  MdUpdate,
  MdOutlineCalculate,
} from 'react-icons/md';
import { Box } from '@mui/system';

const Item = ({ title, to, icon }) => {
  const [active, setActive] = useState(false);
  return (
    <MenuItem
      active={active}
      icon={icon}
      routerLink={<Link to={to} />}
      onClick={() => {
        console.log('clicked');
        setActive(!active);
        console.log('active:' + active);
      }}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Sidebar = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        position: 'fixed',
        zIndex: '10000',
      }}
    >
      <SidebarWrapper
        width="280px"
        transitionDuration={500}
        backgroundColor="#343A40"
      >
        <Menu
          renderMenuItemStyles={() => ({
            '.menu-icon': {
              borderRadius: '100%',
              dropShadow: '0 0 0 1px #fff',
              color: '#fff',
            },
            '.menu-anchor': {
              backgroundColor: '#343A40',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#307BFE',
              },
            },
          })}
        >
          <Box>
            <Item
              title="DEÜ AKILLI KAMPÜS"
              to="/"
              icon={
                <img src="/logo.png" width="220px" height="220px" alt="logo" />
              }
            />
          </Box>
          <Item title="Anasayfa" to="/" icon={<BiHome />} />
          <SubMenu label="Cihazlar Menüsü" icon={<AiOutlineMenuUnfold />}>
            <Item title="Cihazlar" to="/cihazlar" icon={<BiDevices />} />
            <Item
              title="Cihaz Ekle"
              to="/cihazlar/cihaz-ekle"
              icon={<MdAdd />}
            />
            <Item
              title="Cihaz Güncelle"
              to="/cihazlar/cihaz-guncelle"
              icon={<MdUpdate />}
            />
          </SubMenu>
          {/* Cihazlar Menüsü */}
          <Item title="Ölçümler" to="/olcumler" icon={<MdOutlineCalculate />} />
          <SubMenu label="Sensör Türleri Menüsü" icon={<AiOutlineMenuUnfold />}>
            <Item
              title="Sensör Türleri"
              to="/sensor-turleri"
              icon={<AiOutlineSetting />}
            />
            <Item
              title="Sensör Türü Ekle"
              to="/sensor-turleri/sensor-turu-ekle"
              icon={<MdAdd />}
            />
            <Item
              title="Sensor Türü Güncelle"
              to="/sensor-turleri/sensor-turu-guncelle"
              icon={<MdUpdate />}
            />
          </SubMenu>
          {/* Sensör Türleri Menüsü */}
          <SubMenu label="Sensörler Menüsü" icon={<AiOutlineMenuUnfold />}>
            <Item
              title="Sensörler"
              to="/sensorler"
              icon={<MdOutlineSensors />}
            />  
            <Item
              title="Sensör Ekle"
              to="/sensorler/sensor-ekle"
              icon={<MdAdd />}
            />
            <Item
              title="Sensör Güncelle"
              to="/sensorler/sensor-guncelle"
              icon={<MdUpdate />}
            />
          </SubMenu>{' '}
          {/* Sensörler Menüsü */}
          <SubMenu
            label="Limit Kategoriler Menüsü"
            icon={<AiOutlineMenuUnfold />}
          >
            <Item
              title="Limit Kategoriler"
              to="/limit-kategoriler"
              icon={<BiBracket />}
            />
            <Item
              title="Limit Kategori Ekle"
              to="/limit-kategoriler/limit-kategori-ekle"
              icon={<MdAdd />}
            />
          </SubMenu>
          <Item title="Limitler" to="/limitler" icon={<BiSquare />} />
        </Menu>
      </SidebarWrapper>
    </div>
  );
};

export default Sidebar;
