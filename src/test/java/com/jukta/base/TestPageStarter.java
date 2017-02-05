package com.jukta.base;

import com.jukta.jtahoe.dev.Dev;

import java.io.IOException;

/**
 * @since 1.0
 */
public class TestPageStarter {

    public static void main(String[] args) throws IOException {
        Dev.main(new String[0]);
        System.out.println("http://localhost:8080/test.LayoutTestPage");
        System.out.println("http://localhost:8080/test.FormTestPage");
        System.out.println("http://localhost:8080/test.WidgetsTestPage");
    }

}
