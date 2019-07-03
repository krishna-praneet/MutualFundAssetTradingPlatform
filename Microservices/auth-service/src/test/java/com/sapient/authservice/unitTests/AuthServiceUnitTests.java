package com.sapient.authservice.unitTests;

import com.sapient.authservice.dao.UsersDAO;
import com.sapient.authservice.entities.ImmutableUsers;
import com.sapient.authservice.entities.ImmutableUsersDBModel;
import com.sapient.authservice.entities.Users;
import com.sapient.authservice.entities.UsersDBModel;
import com.sapient.authservice.service.UserDetailsServiceImpl;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.userdetails.UserDetails;

import java.net.URI;

public class AuthServiceUnitTests {

    @Mock
    UsersDAO dao;

    @InjectMocks
    UserDetailsServiceImpl service;

    @LocalServerPort
    int port;

    Users user;
    UsersDBModel usersDB;
    String baseUrl;
    UserDetails userDetails;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Before
    public void mockDB(){
//        baseUrl = "http://localhost:" + port + "/auth";
//        user = ImmutableUsers.builder().userId("harsh123").password("qwerty123").role("ROLE_TRADER").fullName("Harsh Jaiswal").build();
        usersDB = ImmutableUsersDBModel.builder().userId("harsh123").password("qwerty123").role("ROLE_TRADER").fullName("Harsh Jaiswal").build();
    }

    @Test
    public void findByUserIdTest(){
        Mockito.when(dao.getUserByUserId(Mockito.any(String.class))).thenReturn((ImmutableUsersDBModel) usersDB);
        Assert.assertEquals((ImmutableUsersDBModel) usersDB, service.findByUserId("harsh123"));
    }
}