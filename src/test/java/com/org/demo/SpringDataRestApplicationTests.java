package com.org.demo;

import static org.assertj.core.api.Assertions.assertThat;

import com.org.demo.controller.VoitureController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = SpringDataRestApplication.class)  // Specify your main app class here
class SpringbootReactPart1ApplicationTests {

	@Autowired
	private VoitureController voitureController;

	@Test
	void contextLoads() {
		assertThat(voitureController).isNotNull();
	}
}
