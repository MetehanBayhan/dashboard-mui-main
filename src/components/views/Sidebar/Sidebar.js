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
import { BiDevices, BiHome, BiSquare, BiBracket } from 'react-icons/bi';
import { AiOutlineSetting, AiOutlineMenuUnfold } from 'react-icons/ai';
import {
  MdOutlineSensors,
  MdAdd,
  MdUpdate,
  MdOutlineCalculate,
} from 'react-icons/md';
import { TbRulerMeasure } from 'react-icons/tb';
import { Box } from '@mui/system';
import ImageComponent from '../../utils/Image';
import Header from '../../utils/Headers';
import React from 'react';
import useEmail from 'hooks/useEmail';

const Item = ({ title, to, icon }) => {
  return (
    <MenuItem icon={icon} component={<Link to={to} />}>
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Sidebar = () => {
  /*
    - useEmail benim yazmış olduğum bir custom hook'tur. Bu hook'u kullanarak email'i alabilirsiniz.
    - Bu hook'u kullanmak için src/hooks/useEmail.js dosyasına gidip oradaki açıklamaları okuyunuz.
    - Bu hook sayesinde email'i State Management kullanmanıza gerek kalmadan çekebilir istediğiniz componentte kullanabilirsiniz.
    - Bunu nasıl yapacaksınız? Çünkü bu sessionStorage kullanır. Yani temelde aynı mantıktır.
    - Sidebar 'a gelirsek; 
        - useEmail hook'unu kullanarak email'i çektik.
        - Sidebar içerisine yerleştirdik. Burada Wrapper içerisine tanımlamış olduğunuz route'ları kullanarak sidebar aracılığıyla
          sayfalar arası geçiş yapabilirsiniz.
        - Sidebar içerisindeki Item componenti bir MenuItem componentidir. Bu componenti kullanarak sidebar içerisindeki
          her bir item'ı oluşturabilirsiniz. Bu componentin içerisindeki icon prop'u ile icon ekleyebilirsiniz.
        - MenuItem componenti bir Link componentidir. Bu componenti kullanarak sidebar içerisindeki her bir item'a tıklandığında
          sayfalar arası geçiş yapabilirsiniz.
      

  */
  const email = useEmail();

  const { collapsed } = useProSidebar();
  return (
    <div className="flex h-screen fixed z-[10000]">
      <SidebarWrapper
        width="280px"
        transitionDuration={300}
        breakPoint="md"
        backgroundColor="#343A40"
        rootStyles={{
          overflow: 'y-scroll',
          border: 'none',
          [`.ps-sidebar-container`]: {
            backgroundColor: '#343A40',
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
          <Box className="border-b-[1px] border-slate-600 flex justify-center items-center">
            <Item
              title="DEÜ AKILLI KAMPÜS"
              to="http://kampus.deu.edu.tr/admin.php"
              icon={
                <img src="/logo.png" width="220px" height="220px" alt="logo" />
              }
            />
          </Box>
          <Box className=" p-7 border-b border-slate-600 flex items-center justify-center">
            {collapsed ? (
              <ImageComponent
                src={user}
                width={15}
                height={15}
                className={'justify-center items-center'}
              />
            ) : (
              <>
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
                  title={email}
                />
                <ImageComponent
                  src={Verified}
                  className="ml-2 fill-green-500"
                  width={15}
                  height={15}
                />
              </>
            )}
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
          </SubMenu>
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
          <Item title="Akım Ölçüm" to="/akim-olcum" icon={<TbRulerMeasure />} />
        </Menu>
      </SidebarWrapper>
    </div>
  );
};

export default Sidebar;
