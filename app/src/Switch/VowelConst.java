package Switch;

import ForLoop.SumOfN;

import java.util.Scanner;

public class VowelConst {
    public static void main(String[] args)
    {
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter the Alphabet: ");
        char ch=sc.next().charAt(0);

        //Normalize lower case
        ch=Character.toLowerCase(ch);

        switch (ch)
        {
            case 'a':
            case 'e':
            case 'i':
            case 'o':
            case 'u':
                System.out.println("Vowel");
                break;
            default:
                //basic validation
                if(ch>='a' && ch<='z')
                {
                    System.out.println("Constant");
                }
                else {
                    System.out.println("Invalid");
                }
        }
        sc.close();
    }
}