import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class WordCounterApp {
    public static void main(String[] args) {
        // Create JFrame
        JFrame frame = new JFrame("Word Counter");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(400, 300);
        frame.setLayout(new BorderLayout());

        // Create JTextArea
        JTextArea textArea = new JTextArea();
        textArea.setLineWrap(true);
        textArea.setWrapStyleWord(true);
        JScrollPane scrollPane = new JScrollPane(textArea);

        // Create JButton
        JButton countButton = new JButton("Count Words");

        // Create JLabel
        JLabel resultLabel = new JLabel("Word Count: 0", SwingConstants.CENTER);

        // Button Click Event
        countButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String text = textArea.getText().trim();
                int wordCount = text.isEmpty() ? 0 : text.split("\\s+").length;
                resultLabel.setText("Word Count: " + wordCount);
            }
        });

        // Add components to frame
        frame.add(scrollPane, BorderLayout.CENTER);
        frame.add(countButton, BorderLayout.SOUTH);
        frame.add(resultLabel, BorderLayout.NORTH);

        // Show frame
        frame.setVisible(true);
    }
}
