package com.knight.cryptobank.controller;

import com.knight.cryptobank.domain.Customer;
import com.knight.cryptobank.dto.CustomerDto;
import com.knight.cryptobank.service.CustomerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CustomerController {

    private CustomerService customerService;

    private final Logger logger = LoggerFactory.getLogger(CustomerController.class);

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
        logger.info("New CustomerController");
    }


    @PutMapping(value = "/register", produces = "application/json")
    public int register(@RequestBody Customer customer) {
        logger.info(customer.toString());
        Customer customerToRegister = customerService.register(customer);
        if(customerToRegister.getSalt()== null) {
            return new ResponseEntity<String>(HttpStatus.I_AM_A_TEAPOT).getStatusCodeValue();
        } else {
            return new ResponseEntity<String>(HttpStatus.CREATED).getStatusCodeValue();
        }
    }

//    @PutMapping("/login")
//    public Customer login(@RequestParam String username, String password) {
//        Customer customerToLogin = customerService.login(username, password);
//        logger.info("login customer aangeroepen");
//        return customerToLogin;
//    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {
        logger.info("login customer aangeroepen");

        CustomerDto customerToLogin = customerService.login(username, password);

        if (customerToLogin.getAccessToken() == null) {
            return new ResponseEntity<>("username/password incorrect", HttpStatus.UNAUTHORIZED);
        } else {
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set(HttpHeaders.AUTHORIZATION, customerToLogin.getAccessToken());
            return new ResponseEntity<>(customerToLogin.toString(), responseHeaders, HttpStatus.CREATED);
        }
    }

}
