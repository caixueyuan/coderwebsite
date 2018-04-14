package com.caixueyuan.security.service;

import com.caixueyuan.entity.UserEntity;
import com.caixueyuan.mapper.UserMapper;
import com.caixueyuan.security.JwtUserFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {


    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
/*        User user = userRepository.findByUsername(username);*/
        UserEntity userEntity = userMapper.getOneByName(username);
        if (userEntity == null) {
            throw new UsernameNotFoundException(String.format("No user found with username '%s'.", username));
        } else {
            return JwtUserFactory.create(userEntity);
        }
    }
}
