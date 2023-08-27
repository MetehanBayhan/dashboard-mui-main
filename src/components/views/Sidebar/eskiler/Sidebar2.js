import { useState } from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import user from './assets/person.svg';
import Verified from './assets/approved.svg';
import {
  Sidebar as SidebarWrapper,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from 'react-pro-sidebar';
import {} from 'react-icons/md';
import { BiDevices, BiHome, BiSquare, BiBracket } from 'react-icons/bi';
import { AiOutlineSetting, AiOutlineMenuUnfold } from 'react-icons/ai';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  MdOutlineSensors,
  MdAdd,
  MdUpdate,
  MdOutlineCalculate,
} from 'react-icons/md';
import { Box } from '@mui/system';
import ImageComponent from './views/Image/ImageComponent';
import Header from './views/Typography/Headers';

const Item = ({ title, to, icon }) => {
  const { collapseSidebar } = useProSidebar();
  return (
    <MenuItem
      icon={icon}
      component={<Link to={to} />}
      onClick={() => {
        collapseSidebar();
      }}
      menuItemStyles={{
        button: {
          backgroundColor: '#343A40',
          color: 'white',
          '&:hover': {
            backgroundColor: '#307BFE',
          },
          '&:focus': {
            backgroundColor: '#307BFE',
          },
          '&:active': {
            backgroundColor: '#307BFE',
          },
        },
      }}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Sidebar = () => {
  return (
    <div className="flex h-screen fixed z-[10000] m-2 rounded-2xl pb-4">
      <SidebarWrapper
        width="280px"
        transitionDuration={500}
        collapsedWidth="0px"
        backgroundColor="#343A40"
        rootStyles={{
          overflow: 'y-scroll',
          border: 'none',
          [`.ps-sidebar-container`]: {
            backgroundColor: '#343A40',
            borderRadius: '1rem',
            borderRight: 'none',
          },
        }}
      >
        <Menu
          rootStyles={{
            [`& .button`]: {
              backgroundColor: '#eaabff',
              color: '#9f0099',
              '&:hover': {
                backgroundColor: '#eecef9',
              },
            },
            [`& .subMenuContent`]: {
              backgroundColor: '#fbedff',
            },
          }}
          menuItemStyles={{
            color: 'white',
            button: {
              backgroundColor: '#343A40',
              color: 'white',
              '&:hover': {
                backgroundColor: '#307BFE',
              },
              '&:focus': {
                backgroundColor: '#307BFE',
              },
              '&:active': {
                backgroundColor: '#307BFE',
              },
            },
          }}
        >
          <Box className="border-b-[1px] border-slate-600">
            <Item
              title="DEÜ AKILLI KAMPÜS"
              to="/"
              icon={
                <img src="/logo.png" width="220px" height="220px" alt="logo" />
              }
            />
          </Box>
          {/* DEÜ AKILLI KAMPÜS LOGO */}
          <Box className=" p-7 border-b border-slate-600 flex items-center justify-center">
            <ImageComponent
              src={user}
              width={30}
              height={30}
              className={'mr-4'}
            />
            <Header
              variant={'p'}
              fontSize={'0.7rem'}
              color={'white'}
              fontWeight={'regular'}
              title={'can.aydin@deu.edu.tr'}
            />
            <ImageComponent
              src={Verified}
              className="ml-2 fill-green-500"
              width={15}
              height={15}
            />
          </Box>
          {/* Kullanıcı Kısmı */}
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
