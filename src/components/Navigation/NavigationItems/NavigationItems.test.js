import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'nzyme-adapter-react-16';
import { expressionStatement } from '@babel/types';

configure({ adapter: new Adapter() });
