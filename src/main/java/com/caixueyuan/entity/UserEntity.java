package com.caixueyuan.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

/**
 * Created by 25299 on 2018/4/13.
 */
public class UserEntity implements Serializable {
    private static final long serialVersionUID = 1L;
    private Integer id;
    private String userName;
    private String password;
    private String email;
    private boolean roles;

    public UserEntity(String userName, String password, String email, boolean roles) {
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.roles = roles;
    }

    public UserEntity(Integer id,String userName,String password,String email){
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.email = email;
    }
    public UserEntity(Integer id, String userName, String password, String email, boolean roles) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.roles = roles;
    }

    public void setid(Integer id){
        this.id = id;
    }
    public Integer getId(){
        return this.id;
    }
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "UserEntity{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

    public Collection<GrantedAuthority> getAuthorities(){
        Collection<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        SimpleGrantedAuthority grantedAuthority = new SimpleGrantedAuthority("ROLL_USER");
        grantedAuthorities.add(grantedAuthority);
        return grantedAuthorities;
    }

    public boolean getRoles() {
        return roles;
    }

    public void setRoles(boolean roles) {
        this.roles = roles;
    }
}
